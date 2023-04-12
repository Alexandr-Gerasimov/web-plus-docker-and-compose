import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
export declare class WishesController {
    private readonly wishesService;
    constructor(wishesService: WishesService);
    create(createWishDto: CreateWishDto, req: any): Promise<import("./entities/wish.entity").Wish>;
    findLast(): Promise<import("./entities/wish.entity").Wish[]>;
    findTop(): Promise<import("./entities/wish.entity").Wish[]>;
    findById(id: number): Promise<import("./entities/wish.entity").Wish>;
    updateOne(id: string, req: any, updateWishDto: UpdateWishDto): Promise<import("./entities/wish.entity").Wish>;
    removeOne(id: string, req: any): Promise<import("./entities/wish.entity").Wish>;
    copy(id: string, req: any): Promise<import("./entities/wish.entity").Wish>;
}
