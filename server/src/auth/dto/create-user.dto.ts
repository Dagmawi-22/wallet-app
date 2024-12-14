import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user. Must be unique and alphanumeric.',
    example: 'john_doe123',
  })
  @IsString({ message: 'Username must be a string.' })
  @IsNotEmpty({ message: 'Username is required.' })
  @MinLength(3, { message: 'Username must be at least 3 characters long.' })
  @MaxLength(20, { message: 'Username must not exceed 20 characters.' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores.',
  })
  username: string;

  @ApiProperty({
    description:
      'The password of the user. Should contain at least one uppercase letter, one lowercase letter, and one number.',
    example: 'StrongPass123!',
  })
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(20, { message: 'Password must not exceed 20 characters.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  password: string;

  @ApiProperty({
    description: 'The full name of the user.',
    example: 'John Doe',
  })
  @IsString({ message: 'Full name must be a string.' })
  @IsNotEmpty({ message: 'Full name is required.' })
  @MinLength(3, { message: 'Full name must be at least 3 characters long.' })
  @MaxLength(100, { message: 'Full name must not exceed 100 characters.' })
  fullName: string;
}
