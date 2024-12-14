import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  providers: [UserService, JwtService, PrismaService],
  controllers: [],
})
export class UserModule {}
