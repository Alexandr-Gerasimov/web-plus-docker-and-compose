import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { User } from './entities/user.entity';
import { FindUsersDto } from './dto/find-user.dto';

export interface UserRequest extends Request {
  user: User;
}

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('find')
  async findBy(@Body() findUserDto: FindUsersDto) {
    return this.usersService.findBy(findUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me/wishes')
  async findOwnWishes(@Req() req: UserRequest) {
    return this.usersService.findUserWishes(req.user.id);
  }

  @Get(':username/wishes')
  async findUserWishes(@Param('username') username: string) {
    const user = await this.findByUsername(username);
    return this.usersService.findUserWishes(user.id);
  }

  @Get('me')
  findOne(@Req() req: UserRequest) {
    delete req.user.password;
    return req.user;
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    delete user.password;
    delete user.email;
    return user;
  }

  @Patch('me')
  updateOne(@Req() req: UserRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOne(req.user.id, updateUserDto);
  }
}
