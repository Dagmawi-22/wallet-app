import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { TransactionService } from '../service/transaction.service';
import { DepositDto, WithdrawDto, TransferDto } from '../dto/transaction.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DepositSwagger, GetTransfersSwagger, TransferSwagger, WithdrawSwagger } from '../swagger/transaction.swagger';

@ApiTags('Transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @GetTransfersSwagger
  async getTransfers(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.transactionService.getTransfers({
      page,
      limit,
      user: req.user,
    });
  }

  @Post('deposit')
  @DepositSwagger
  async deposit(@Request() req, @Body() depositDto: DepositDto) {
    return this.transactionService.deposit(depositDto, req.user);
  }

  @Post('withdraw')
  @WithdrawSwagger
  async withdraw(@Request() req, @Body() withdrawDto: WithdrawDto) {
    return this.transactionService.withdraw(withdrawDto, req.user);
  }

  @Post('transfer')
  @TransferSwagger
  async transfer(@Request() req, @Body() transferDto: TransferDto) {
    return this.transactionService.transfer(transferDto, req.user);
  }
}
