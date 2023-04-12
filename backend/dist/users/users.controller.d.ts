import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FindUsersDto } from './dto/find-user.dto';
export interface UserRequest extends Request {
    user: User;
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findBy(findUserDto: FindUsersDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOwnWishes(req: UserRequest): Promise<import("../wishes/entities/wish.entity").Wish[]>;
    findUserWishes(username: string): Promise<import("../wishes/entities/wish.entity").Wish[]>;
    findOne(req: UserRequest): User;
    findByUsername(username: string): Promise<User>;
    updateOne(req: UserRequest, updateUserDto: UpdateUserDto): Promise<User>;
}
