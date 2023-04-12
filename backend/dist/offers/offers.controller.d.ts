import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { FindOneOptions } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { UserRequest } from 'src/users/users.controller';
export declare class OffersController {
    private readonly offersService;
    constructor(offersService: OffersService);
    create(createOfferDto: CreateOfferDto, req: UserRequest): Promise<Offer>;
    findAll(): Promise<Offer[]>;
    findOne(id: FindOneOptions<Offer>): Promise<Offer>;
}
