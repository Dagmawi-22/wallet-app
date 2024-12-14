import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

export const TransactionControllerSwagger = applyDecorators(
  ApiTags('Transactions'),
  ApiBearerAuth('JWT-auth'),
);

export const GetTransfersSwagger = applyDecorators(
  UseGuards(JwtAuthGuard),
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
