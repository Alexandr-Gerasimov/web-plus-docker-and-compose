import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { HashService } from 'src/hash/hash.service';
export declare class AuthService {
    private jwtService;
    private usersService;
    private hashService;
    constructor(jwtService: JwtService, usersService: UsersService, hashService: HashService);
    auth(user: User): {
        access_token: string;
    };
    validatePassword(username: string, pass: string): Promise<User>;
}
