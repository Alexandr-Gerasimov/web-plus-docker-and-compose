import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@UseGuards(JwtGuard)
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto, @Req() req) {
    return this.wishlistsService.create(createWishlistDto, req.user);
  }

  @Get()
  getWishlists() {
    return this.wishlistsService.getWishlists();
  }

  @Get(':id')
  getById(@Param('id') id) {
    return this.wishlistsService.getById(id);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @Req() req,
  ) {
    return this.wishlistsService.updateOne(+id, updateWishlistDto, req.user.id);
  }

  @Delete(':id')
  removeOne(@Param('id') id: string, @Req() req) {
    return this.wishlistsService.removeOne(+id, req.user.id);
  }
}
