import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) {}
  async create(createWishDto: CreateWishDto, user: User) {
    const wish = await this.wishesRepository.create({
      ...createWishDto,
      owner: user,
    });
    delete wish.owner.password;
    return this.wishesRepository.save(wish);
  }

  findOne(query: FindOneOptions<Wish>): Promise<Wish> {
    return this.wishesRepository.findOne(query);
  }

  async findLast() {
    const wishes = await this.wishesRepository.find({
      relations: {
        owner: true,
        offers: {
          item: true,
        },
      },
      order: { createdAt: 'DESC' },
      take: 40,
    });
    wishes.forEach((wish) => {
      delete wish.owner.password;
      delete wish.owner.email;
    });

    return wishes;
  }

  async findTop() {
    const wishes = await this.wishesRepository.find({
      relations: {
        owner: true,
        offers: {
          item: true,
        },
      },
      order: { copied: 'DESC' },
      take: 10,
    });

    wishes.forEach((wish) => {
      delete wish.owner.password;
      delete wish.owner.email;
    });

    return wishes;
  }

  async findById(id: number) {
    const wish = await this.wishesRepository.findOne({
      where: { id },
      relations: { owner: true },
    });

    if (!wish) {
      throw new ForbiddenException('Такого подарка не существует');
    }

    delete wish.owner.password;

    return wish;
  }

  async updateOne(id: number, userId: number, updateWishDto: UpdateWishDto) {
    const wish = await this.wishesRepository.findOne({
      where: { id },
      relations: { owner: true },
    });

    if (wish.owner.id !== userId) {
      throw new ForbiddenException('Можно редактировать только свои подарки');
    }

    if (updateWishDto.price && wish.raised !== 0) {
      throw new ForbiddenException(
        'Нельзя изменять стоимость подарка, если уже есть желающие скинуться',
      );
    }

    this.wishesRepository.update(id, updateWishDto);
    delete wish.owner.password;
    delete wish.owner.email;
    return wish;
  }

  async removeOne(id: number, userId) {
    const wish = await this.wishesRepository.findOne({
      where: { id },
      relations: { owner: true },
    });

    if (userId !== wish.owner.id) {
      throw new ForbiddenException('Можно удалять только свои подарки');
    }

    this.wishesRepository.delete(id);
    delete wish.owner.password;
    delete wish.owner.email;
    return wish;
  }

  async copy(id: number, owner: User) {
    const wish = await this.wishesRepository.findOne({
      where: { id },
      relations: { owner: true },
    });

    const copyWish = {
      name: wish.name,
      link: wish.link,
      image: wish.image,
      price: wish.price,
      description: wish.description,
    };

    const newWish = await this.create(copyWish, owner);
    delete newWish.owner.password;
    delete newWish.owner.email;
    return newWish;
  }
}
