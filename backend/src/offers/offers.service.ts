import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { WishesService } from '../wishes/wishes.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    private wishService: WishesService,
  ) {}

  async create(createOfferDto: CreateOfferDto, user: User) {
    const wish = await this.wishService.findOne({
      where: { id: createOfferDto.itemId },
      relations: {
        offers: true,
        owner: true,
      },
    });

    if (!wish) {
      throw new ForbiddenException('такого подарка не существует');
    }

    if (wish.owner.id === user.id) {
      throw new ForbiddenException(
        'Нельзя внести деньги на собственный подарок',
      );
    }

    const totalSumm = createOfferDto.amount + wish.raised;

    if (totalSumm > wish.price) {
      throw new ForbiddenException('Сумма взноса превышает стоимость подарка');
    }

    const offer = this.offersRepository.create({
      ...createOfferDto,
      user: { id: user.id },
      item: { id: createOfferDto.itemId },
    });

    return this.offersRepository.save(offer);
  }

  async findAll() {
    const allOffers = await this.offersRepository.find({
      relations: {
        item: { owner: true },
        user: { wishes: true, offers: true },
      },
    });

    allOffers.forEach((offer) => {
      delete offer.user.password;
      delete offer.user.email;
      delete offer.item.owner.password;
      delete offer.item.owner.email;
    });

    return allOffers;
  }

  async findOne(id: FindOneOptions<Offer>) {
    const offer = await this.offersRepository.findOne({
      where: { id: +id },
      relations: {
        item: { owner: true },
        user: { wishes: true, offers: true },
      },
    });

    delete offer.user.password;
    delete offer.user.email;
    delete offer.item.owner.password;
    delete offer.item.owner.email;

    return offer;
  }
}
