import { Module } from '@nestjs/common';
import { TransactionController } from './controller/transaction.controller';
import { TransactionService } from './service/transaction.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [TransactionService, JwtService, PrismaService, UserService],
  exports: [TransactionService],
})
export class TransactionModule {}
