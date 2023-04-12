"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wish_entity_1 = require("./entities/wish.entity");
let WishesService = class WishesService {
    constructor(wishesRepository) {
        this.wishesRepository = wishesRepository;
    }
    async create(createWishDto, user) {
        const wish = await this.wishesRepository.create(Object.assign(Object.assign({}, createWishDto), { owner: user }));
        delete wish.owner.password;
        return this.wishesRepository.save(wish);
    }
    findOne(query) {
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
    async findById(id) {
        const wish = await this.wishesRepository.findOne({
            where: { id },
            relations: { owner: true },
        });
        if (!wish) {
            throw new common_1.ForbiddenException('Такого подарка не существует');
        }
        delete wish.owner.password;
        return wish;
    }
    async updateOne(id, userId, updateWishDto) {
        const wish = await this.wishesRepository.findOne({
            where: { id },
            relations: { owner: true },
        });
        if (wish.owner.id !== userId) {
            throw new common_1.ForbiddenException('Можно редактировать только свои подарки');
        }
        if (updateWishDto.price && wish.raised !== 0) {
            throw new common_1.ForbiddenException('Нельзя изменять стоимость подарка, если уже есть желающие скинуться');
        }
        this.wishesRepository.update(id, updateWishDto);
        delete wish.owner.password;
        delete wish.owner.email;
        return wish;
    }
    async removeOne(id, userId) {
        const wish = await this.wishesRepository.findOne({
            where: { id },
            relations: { owner: true },
        });
        if (userId !== wish.owner.id) {
            throw new common_1.ForbiddenException('Можно удалять только свои подарки');
        }
        this.wishesRepository.delete(id);
        delete wish.owner.password;
        delete wish.owner.email;
        return wish;
    }
    async copy(id, owner) {
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
};
WishesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WishesService);
exports.WishesService = WishesService;
//# sourceMappingURL=wishes.service.js.map