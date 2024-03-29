import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private hashService: HashService,
  ) {}

  auth(user: User) {
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '24h' }),
    };
  }

  async validatePassword(username: string, pass: string) {
    const user = await this.usersService.findOne({ where: { username } });

    if (user && user.password) {
      const isVerified = await this.hashService.verify(pass, user.password);

      return isVerified ? user : null;
    }

    return null;
  }
}
