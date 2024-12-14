import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

export const TransactionControllerSwagger = applyDecorators(
  ApiTags('Transactions'),
  ApiBearerAuth('JWT-auth'),
);

export const GetTransfersSwagger = applyDecorators(
  UseGuards(JwtAuthGuard),
  ApiOperation({ summary: "Get the user's transfer history" }),
  ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (starts from 1)',
  }),
  ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  }),
  ApiResponse({
    status: 200,
    description: 'List of transactions with pagination',
    schema: {
      example: {
        data: [
          {
            id: 3,
            amount: 50.75,
            accountId: 2,
            destinationId: null,
            type: 'WITHDRAWAL',
            createdAt: '2024-12-14T16:52:45.197Z',
            updatedAt: '2024-12-14T16:52:45.197Z',
            deletedAt: null,
          },
          {
            id: 2,
            amount: 100.5,
            accountId: 2,
            destinationId: null,
            type: 'DEPOSIT',
            createdAt: '2024-12-14T16:52:05.694Z',
            updatedAt: '2024-12-14T16:52:05.694Z',
            deletedAt: null,
          },
        ],
        meta: {
          total: 3,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      },
    },
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - No or invalid authentication token',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  }),
  ApiResponse({
    status: 403,
    description: 'Forbidden - Not enough permissions to access this resource',
    schema: {
      example: {
        statusCode: 403,
        message: 'Forbidden resource',
        error: 'Forbidden',
      },
    },
  }),
);

export const DepositSwagger = applyDecorators(
  UseGuards(JwtAuthGuard),
  ApiOperation({ summary: "Deposit funds into the user's account" }),

  ApiResponse({
    status: 200,
    description: "Successfully deposited funds into the user's account",
    schema: {
      example: {
        data: {
          id: 4,
          amount: 100.5,
          accountId: 2,
          destinationId: null,
          type: 'DEPOSIT',
          createdAt: '2024-12-14T18:39:00.929Z',
          updatedAt: '2024-12-14T18:39:00.929Z',
          deletedAt: null,
        },
      },
    },
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - No or invalid authentication token',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  }),
);

export const WithdrawSwagger = applyDecorators(
  UseGuards(JwtAuthGuard),
  ApiOperation({ summary: "Withdraw funds from the user's account" }),

  ApiResponse({
    status: 200,
    description: "Successfully withdrew funds from the user's account",
    schema: {
      example: {
        data: {
          id: 4,
          amount: 100.5,
          accountId: 2,
          destinationId: null,
          type: 'WITHDRAWAL',
          createdAt: '2024-12-14T18:39:00.929Z',
          updatedAt: '2024-12-14T18:39:00.929Z',
          deletedAt: null,
        },
      },
    },
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - No or invalid authentication token',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  }),
);

export const TransferSwagger = applyDecorators(
  UseGuards(JwtAuthGuard),
  ApiOperation({ summary: "Transfer funds between accounts" }),

  ApiResponse({
    status: 200,
    description: "Successfully transferred funds between accounts",
    schema: {
      example: {
        data: {
          id: 4,
          amount: 100.5,
          accountId: 2,
          destinationId: 5,
          type: 'TRANSFER',
          createdAt: '2024-12-14T18:39:00.929Z',
          updatedAt: '2024-12-14T18:39:00.929Z',
          deletedAt: null,
        },
      },
    },
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized - No or invalid authentication token',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  }),
);
