import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @MinLength(2)
  @IsString()
  password: string;
}
