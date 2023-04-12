import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';

export class SigninUserDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(64)
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(2)
  @IsString()
  password: string;
}
