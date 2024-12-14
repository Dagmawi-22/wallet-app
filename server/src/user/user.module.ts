import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  providers: [UserService, JwtService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
