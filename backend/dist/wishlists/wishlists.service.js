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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wishlist_entity_1 = require("./entities/wishlist.entity");
let WishlistsService = class WishlistsService {
    constructor(wishlistsRepository) {
        this.wishlistsRepository = wishlistsRepository;
    }
    create(createWishlistDto, user) {
        const { itemsId } = createWishlistDto, rest = __rest(createWishlistDto, ["itemsId"]);
        const items = itemsId.map((id) => ({ id }));
        const wishlist = this.wishlistsRepository.create(Object.assign(Object.assign({}, rest), { items, owner: user }));
        delete wishlist.owner.password;
        delete wishlist.owner.email;
        return this.wishlistsRepository.save(wishlist);
    }
    findAll(query) {
        return this.wishlistsRepository.find(query);
    }
    findOne(query) {
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
    async getById(id) {
        const wishList = await this.findOne({
            where: { id },
            relations: {
                owner: true,
                items: true,
            },
        });
        if (!wishList) {
            throw new common_1.ForbiddenException('wishList не найден');
        }
        delete wishList.owner.password;
        delete wishList.owner.email;
        return wishList;
    }
    async updateOne(id, updateWishlistDto, userId) {
        const wishlist = await this.findOne({
            where: { id },
            relations: { owner: true, items: true },
        });
        if (wishlist.owner.id !== userId) {
            throw new common_1.ForbiddenException('Нельзя редактировать чужой список');
        }
        const { itemsId } = updateWishlistDto, rest = __rest(updateWishlistDto, ["itemsId"]);
        const items = itemsId.map((id) => ({ id }));
        const updateWishlist = Object.assign(Object.assign({}, rest), { items });
        await this.wishlistsRepository.save(Object.assign({ id }, updateWishlist));
        const newWishlist = await this.findOne({
            where: { id },
            relations: { owner: true, items: true },
        });
        delete newWishlist.owner.password;
        delete newWishlist.owner.email;
        return newWishlist;
    }
    async removeOne(id, userId) {
        const wishlist = await this.findOne({
            where: { id },
            relations: { owner: true },
        });
        if (wishlist.owner.id !== userId) {
            throw new common_1.ForbiddenException('Нельзя удалить чужой список');
        }
        this.wishlistsRepository.delete(id);
        delete wishlist.owner.password;
        delete wishlist.owner.email;
        return wishlist;
    }
};
WishlistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wishlist_entity_1.Wishlist)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WishlistsService);
exports.WishlistsService = WishlistsService;
//# sourceMappingURL=wishlists.service.js.map