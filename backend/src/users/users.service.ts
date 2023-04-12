import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from 'src/hash/hash.service';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, username } = createUserDto;
    const existUser = await this.userRepository.findOne({
      where: [{ email }, { username }],
    });
    if (existUser) {
      throw new ConflictException(
        'Пользователь с таким email или username уже зарегистрирован',
      );
    }
    const hash = await this.hashService.hash(createUserDto.password);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hash,
    });

    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(query: FindOneOptions<User>) {
    return this.userRepository.findOne(query);
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findBy({ query }) {
    const user = await this.userRepository.findOne({
      where: [{ email: query }, { username: query }],
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    delete user.password;

    return user;
  }

  async findUserWishes(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        wishes: { owner: true },
      },
    });

    user.wishes.forEach((wish) => {
      delete wish.owner.password;
      delete wish.owner.email;
      return wish;
    });

    return user.wishes;
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    const user = this.userRepository.findOne({ where: { id } });

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashService.hash(
        updateUserDto.password,
      );
    }

    const userUpdate = { ...user, ...updateUserDto };

    await this.userRepository.update(id, userUpdate);

    const newUser = await this.findOne({ where: { id } });

    delete newUser.password;

    return newUser;
  }
}
