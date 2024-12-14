import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(username: string, hashedPassword: string, fullName: string) {
    try {
      return await this.prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          fullName,
          account: {
            create: {
              balance: 0.0, 
            },
          },
        },
        include: {
          account: {
            include: {
              transactions: true, 
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating user, please try again.',
        error.message,
      );
    }
  }

  async findOne(username: string) {
    try {
      return await this.prisma.user.findFirst({
        where: { username },
        include: {
          account: {
            include: {
              transactions: true, 
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error finding user, please try again.',
        error.message,
      );
    }
  }

  async findById(id: number) {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error finding user by ID, please try again.',
        error.message,
      );
    }
  }
}
