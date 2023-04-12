import { User } from 'src/users/entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
export declare class WishesService {
    private wishesRepository;
    constructor(wishesRepository: Repository<Wish>);
    create(createWishDto: CreateWishDto, user: User): Promise<Wish>;
    findOne(query: FindOneOptions<Wish>): Promise<Wish>;
    findLast(): Promise<Wish[]>;
    findTop(): Promise<Wish[]>;
    findById(id: number): Promise<Wish>;
    updateOne(id: number, userId: number, updateWishDto: UpdateWishDto): Promise<Wish>;
    removeOne(id: number, userId: any): Promise<Wish>;
    copy(id: number, owner: User): Promise<Wish>;
}
