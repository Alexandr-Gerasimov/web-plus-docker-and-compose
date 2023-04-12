import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @MinLength(1)
  @MaxLength(64)
  @IsString()
  username: string;

  @IsOptional()
  @MinLength(0)
  @MaxLength(200)
  @IsString()
  about: string;

  @IsOptional()
  @IsUrl()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @MinLength(2)
  @IsString()
  password: string;
}
