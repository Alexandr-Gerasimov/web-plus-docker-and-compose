import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    signup(createUserDto: CreateUserDto): Promise<import("../users/entities/user.entity").User>;
    signin(req: any): {
        access_token: string;
    };
}
