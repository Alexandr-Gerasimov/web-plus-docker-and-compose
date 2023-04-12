import { IsNotEmpty, IsUrl, MaxLength, Min, MinLength } from 'class-validator';

export class CreateWishDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(250)
  name: string;

  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @Min(1)
  price: number;

  @IsNotEmpty()
  description: string;
}
