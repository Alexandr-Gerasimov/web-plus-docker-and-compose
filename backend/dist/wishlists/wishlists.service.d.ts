import { User } from 'src/users/entities/user.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
export declare class WishlistsService {
    private wishlistsRepository;
    constructor(wishlistsRepository: Repository<Wishlist>);
    create(createWishlistDto: CreateWishlistDto, user: User): Promise<Wishlist>;
    findAll(query: FindManyOptions<Wishlist>): Promise<Wishlist[]>;
    findOne(query: FindOneOptions<Wishlist>): Promise<Wishlist>;
    getWishlists(): Promise<Wishlist[]>;
    getById(id: number): Promise<Wishlist>;
    updateOne(id: number, updateWishlistDto: UpdateWishlistDto, userId: number): Promise<Wishlist>;
    removeOne(id: number, userId: any): Promise<Wishlist>;
}
