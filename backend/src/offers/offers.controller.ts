import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { FindOneOptions } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { UserRequest } from 'src/users/users.controller';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto, @Req() req: UserRequest) {
    return this.offersService.create(createOfferDto, req.user);
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: FindOneOptions<Offer>) {
    return this.offersService.findOne(id);
  }
}
