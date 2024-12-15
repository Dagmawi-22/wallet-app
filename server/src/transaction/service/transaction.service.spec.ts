import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { PrismaService } from '../../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { TransactionType } from '@prisma/client';

describe('TransactionService', () => {
  let service: TransactionService;
  let prisma: PrismaService;

  const mockPrismaService = {
    $transaction: jest.fn((callback) => callback(mockPrismaService)),
    transaction: {
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
    },
    account: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockUser = {
    id: 1,
    account: { id: 1 },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTransfers', () => {
    it('should return paginated transactions', async () => {
      const mockTransactions = [{ id: 1, amount: 100 }];
      mockPrismaService.transaction.findMany.mockResolvedValue(
        mockTransactions,
      );
      mockPrismaService.transaction.count.mockResolvedValue(1);

      const result = await service.getTransfers({
        page: 1,
        limit: 10,
        user: mockUser as any,
      });

      expect(result).toEqual({
        data: mockTransactions,
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      });
    });
  });

  describe('deposit', () => {
    it('should create a deposit transaction', async () => {
      const mockTransaction = { id: 1, amount: 100 };
      const mockUpdatedAccount = { id: 1, balance: 100 };
      mockPrismaService.transaction.create.mockResolvedValue(mockTransaction);
      mockPrismaService.account.update.mockResolvedValue(mockUpdatedAccount);

      const result = await service.deposit({ amount: 100 }, mockUser as any);

      expect(result).toEqual({
        ...mockTransaction,
        new_balance: mockUpdatedAccount.balance,
      });
      expect(mockPrismaService.transaction.create).toHaveBeenCalledWith({
        data: {
          amount: 100,
          type: TransactionType.DEPOSIT,
          accountId: mockUser.account.id,
        },
      });
    });

    it('should throw BadRequestException for negative amount', async () => {
      await expect(
        service.deposit({ amount: -100 }, mockUser as any),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('withdraw', () => {
    it('should create a withdrawal transaction', async () => {
      const mockAccount = { id: 1, balance: 200 };
      const mockTransaction = { id: 1, amount: 100 };
      const mockUpdatedAccount = { id: 1, balance: 100 };

      mockPrismaService.account.findUnique.mockResolvedValue(mockAccount);
      mockPrismaService.transaction.create.mockResolvedValue(mockTransaction);
      mockPrismaService.account.update.mockResolvedValue(mockUpdatedAccount);

      const result = await service.withdraw({ amount: 100 }, mockUser as any);

      expect(result).toEqual({
        ...mockTransaction,
        new_balance: mockUpdatedAccount.balance,
      });
    });

    it('should throw BadRequestException for insufficient balance', async () => {
      mockPrismaService.account.findUnique.mockResolvedValue({
        id: 1,
        balance: 50,
      });

      await expect(
        service.withdraw({ amount: 100 }, mockUser as any),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('transfer', () => {
    it('should create a transfer transaction', async () => {
      const mockSourceAccount = { id: 1, balance: 200 };
      const mockDestAccount = { id: 2, balance: 100 };
      const mockTransaction = { id: 1, amount: 100 };
      const mockUpdatedAccount = { id: 1, balance: 100 };

      mockPrismaService.account.findUnique
        .mockResolvedValueOnce(mockSourceAccount)
        .mockResolvedValueOnce(mockDestAccount);
      mockPrismaService.transaction.create.mockResolvedValue(mockTransaction);
      mockPrismaService.account.update.mockResolvedValue(mockUpdatedAccount);

      const result = await service.transfer(
        { amount: 100, destinationAccountId: 2 },
        mockUser as any,
      );

      expect(result).toEqual({
        ...mockTransaction,
        new_balance: mockUpdatedAccount.balance,
      });
    });

    it('should throw BadRequestException for same account transfer', async () => {
      await expect(
        service.transfer(
          { amount: 100, destinationAccountId: mockUser.account.id },
          mockUser as any,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for insufficient balance', async () => {
      mockPrismaService.account.findUnique
        .mockResolvedValueOnce({ id: 1, balance: 50 })
        .mockResolvedValueOnce({ id: 2, balance: 100 });

      await expect(
        service.transfer(
          { amount: 100, destinationAccountId: 2 },
          mockUser as any,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
