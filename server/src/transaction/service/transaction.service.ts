import { DepositDto, TransferDto, WithdrawDto } from '../dto/transaction.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TransactionType, User } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async getTransfers({
    page,
    limit,
    user,
  }: {
    page: number;
    limit: number;
    user: User & { account: { id: number } };
  }) {
    const accountId = user.account.id;
    const [transactions, total] = await Promise.all([
      this.prisma.transaction.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          OR: [
            { account: { id: accountId } },
            { destination: { id: accountId } },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.transaction.count({
        where: {
          OR: [
            { account: { id: accountId } },
            { destination: { id: accountId } },
          ],
        },
      }),
    ]);

    return {
      data: transactions,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async deposit(
    depositDto: DepositDto,
    user: User & { account: { id: number } },
  ) {
    const { amount } = depositDto;
    const accountId = user.account.id;
    if (amount <= 0) {
      throw new BadRequestException('Deposit amount must be positive');
    }

    return await this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: {
          amount,
          type: TransactionType.DEPOSIT,
          accountId,
        },
      });

      const updatedAccount = await tx.account.update({
        where: { id: accountId },
        data: {
          balance: { increment: amount },
        },
      });

      return {
        ...transaction,
        new_balance: updatedAccount.balance,
      };
    });
  }

  async withdraw(
    withdrawDto: WithdrawDto,
    user: User & { account: { id: number } },
  ) {
    const { amount } = withdrawDto;
    const accountId = user.account.id;
    if (amount <= 0) {
      throw new BadRequestException('Withdrawal amount must be positive');
    }

    return await this.prisma.$transaction(async (tx) => {
      const account = await tx.account.findUnique({
        where: { id: accountId },
      });

      if (!account || account.balance < amount) {
        throw new BadRequestException('Insufficient balance');
      }

      const transaction = await tx.transaction.create({
        data: {
          amount,
          type: TransactionType.WITHDRAWAL,
          accountId,
        },
      });

      const updatedAccount = await tx.account.update({
        where: { id: accountId },
        data: {
          balance: { decrement: amount },
        },
      });

      return {
        ...transaction,
        new_balance: updatedAccount.balance,
      };
    });
  }

  async transfer(
    transferDto: TransferDto,
    user: User & { account: { id: number } },
  ) {
    const { destinationAccountId, amount } = transferDto;
    const accountId = user.account.id;
    if (amount <= 0) {
      throw new BadRequestException('Transfer amount must be positive');
    }

    if (accountId === destinationAccountId) {
      throw new BadRequestException('Cannot transfer to the same account');
    }

    return await this.prisma.$transaction(async (tx) => {
      const [sourceAccount, destinationAccount] = await Promise.all([
        tx.account.findUnique({ where: { id: accountId } }),
        tx.account.findUnique({ where: { id: destinationAccountId } }),
      ]);

      if (!sourceAccount || !destinationAccount) {
        throw new BadRequestException('One or both accounts not found');
      }

      if (sourceAccount.balance < amount) {
        throw new BadRequestException('Insufficient balance');
      }

      const transaction = await tx.transaction.create({
        data: {
          amount,
          type: TransactionType.TRANSFER,
          account: {
            connect: { id: accountId },
          },
          destination: {
            connect: { id: destinationAccountId },
          },
        },
      });

      const [updatedSourceAccount] = await Promise.all([
        tx.account.update({
          where: { id: accountId },
          data: {
            balance: { decrement: amount },
          },
        }),
        tx.account.update({
          where: { id: destinationAccountId },
          data: {
            balance: { increment: amount },
          },
        }),
      ]);

      return {
        ...transaction,
        new_balance: updatedSourceAccount.balance,
      };
    });
  }
}
