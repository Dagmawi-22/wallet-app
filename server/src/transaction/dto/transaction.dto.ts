import { IsNumber, IsPositive, Min, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DepositDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0.01)
  @ApiProperty({
    description: 'Amount to deposit in the account',
    example: 100.5,
    minimum: 0.01,
    type: Number,
  })
  amount: number;

}

export class WithdrawDto extends DepositDto {
  @ApiProperty({
    description: 'Amount to withdraw from the account',
    example: 50.75,
    minimum: 0.01,
    type: Number,
  })
  amount: number;

}

export class TransferDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0.01)
  @ApiProperty({
    description: 'Amount to transfer between accounts',
    example: 75.25,
    minimum: 0.01,
    type: Number,
  })
  amount: number;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'ID of the account to transfer to',
    example: 2,
    type: Number,
  })
  destinationAccountId: number;
}
