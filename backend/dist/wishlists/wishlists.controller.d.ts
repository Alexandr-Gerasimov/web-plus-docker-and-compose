import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
export declare class WishlistsController {
    private readonly wishlistsService;
    constructor(wishlistsService: WishlistsService);
    create(createWishlistDto: CreateWishlistDto, req: any): Promise<import("./entities/wishlist.entity").Wishlist>;
    getWishlists(): Promise<import("./entities/wishlist.entity").Wishlist[]>;
    getById(id: any): Promise<import("./entities/wishlist.entity").Wishlist>;
    updateOne(id: string, updateWishlistDto: UpdateWishlistDto, req: any): Promise<import("./entities/wishlist.entity").Wishlist>;
    removeOne(id: string, req: any): Promise<import("./entities/wishlist.entity").Wishlist>;
}
