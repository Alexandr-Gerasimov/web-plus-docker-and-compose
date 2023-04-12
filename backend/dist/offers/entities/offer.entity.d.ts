import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
export declare class Offer {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    item: Wish;
    ammount: number;
    hidden: boolean;
}
