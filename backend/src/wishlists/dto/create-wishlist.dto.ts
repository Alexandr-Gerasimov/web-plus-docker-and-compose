import { IsArray, IsOptional, IsUrl } from 'class-validator';

export class CreateWishlistDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsUrl()
  image: string;

  @IsOptional()
  @IsArray()
  itemsId: number[];
}
