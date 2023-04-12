import { HashService } from 'src/hash/hash.service';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private userRepository;
    private hashService;
    constructor(userRepository: Repository<User>, hashService: HashService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(query: FindOneOptions<User>): Promise<User>;
    findByUsername(username: string): Promise<User>;
    findBy({ query }: {
        query: any;
    }): Promise<User>;
    findUserWishes(id: number): Promise<import("../wishes/entities/wish.entity").Wish[]>;
    updateOne(id: number, updateUserDto: UpdateUserDto): Promise<User>;
}
