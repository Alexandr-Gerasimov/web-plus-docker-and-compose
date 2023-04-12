import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistsRepository: Repository<Wishlist>,
  ) {}

  create(createWishlistDto: CreateWishlistDto, user: User) {
    const { itemsId, ...rest } = createWishlistDto;
    const items = itemsId.map((id) => ({ id }));
    const wishlist = this.wishlistsRepository.create({
      ...rest,
      items,
      owner: user,
    });

    delete wishlist.owner.password;
    delete wishlist.owner.email;

    return this.wishlistsRepository.save(wishlist);
  }

  findAll(query: FindManyOptions<Wishlist>) {
    return this.wishlistsRepository.find(query);
  }

  findOne(query: FindOneOptions<Wishlist>) {
    return this.wishlistsRepository.findOne(query);
  }

  async getWishlists() {
    const wishLists = await this.findAll({
      relations: {
        owner: true,
        items: true,
      },
    });

    wishLists.forEach((wishList) => {
      delete wishList.owner.password;
      delete wishList.owner.email;
    });

    return wishLists;
  }

  async getById(id: number) {
    const wishList = await this.findOne({
      where: { id },
      relations: {
        owner: true,
        items: true,
      },
    });

    if (!wishList) {
      throw new ForbiddenException('wishList не найден');
    }

    delete wishList.owner.password;
    delete wishList.owner.email;

    return wishList;
  }

  async updateOne(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
    userId: number,
  ) {
    const wishlist = await this.findOne({
      where: { id },
      relations: { owner: true, items: true },
    });

    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException('Нельзя редактировать чужой список');
    }

    const { itemsId, ...rest } = updateWishlistDto;
    const items = itemsId.map((id) => ({ id }));
    const updateWishlist = { ...rest, items };

    await this.wishlistsRepository.save({ id, ...updateWishlist });

    const newWishlist = await this.findOne({
      where: { id },
      relations: { owner: true, items: true },
    });

    delete newWishlist.owner.password;
    delete newWishlist.owner.email;

    return newWishlist;
  }

  async removeOne(id: number, userId) {
    const wishlist = await this.findOne({
      where: { id },
      relations: { owner: true },
    });

    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException('Нельзя удалить чужой список');
    }

    this.wishlistsRepository.delete(id);

    delete wishlist.owner.password;
    delete wishlist.owner.email;

    return wishlist;
  }
}
