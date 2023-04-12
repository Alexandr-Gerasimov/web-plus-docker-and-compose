import { User } from 'src/users/entities/user.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { WishesService } from '../wishes/wishes.service';
import { Offer } from './entities/offer.entity';
import { FindOneOptions, Repository } from 'typeorm';
export declare class OffersService {
    private offersRepository;
    private wishService;
    constructor(offersRepository: Repository<Offer>, wishService: WishesService);
    create(createOfferDto: CreateOfferDto, user: User): Promise<Offer>;
    findAll(): Promise<Offer[]>;
    findOne(id: FindOneOptions<Offer>): Promise<Offer>;
}
