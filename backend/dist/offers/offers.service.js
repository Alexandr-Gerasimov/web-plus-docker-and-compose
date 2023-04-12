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
exports.OffersService = void 0;
const common_1 = require("@nestjs/common");
const wishes_service_1 = require("../wishes/wishes.service");
const typeorm_1 = require("@nestjs/typeorm");
const offer_entity_1 = require("./entities/offer.entity");
const typeorm_2 = require("typeorm");
let OffersService = class OffersService {
    constructor(offersRepository, wishService) {
        this.offersRepository = offersRepository;
        this.wishService = wishService;
    }
    async create(createOfferDto, user) {
        const wish = await this.wishService.findOne({
            where: { id: createOfferDto.itemId },
            relations: {
                offers: true,
                owner: true,
            },
        });
        if (!wish) {
            throw new common_1.ForbiddenException('такого подарка не существует');
        }
        if (wish.owner.id === user.id) {
            throw new common_1.ForbiddenException('Нельзя внести деньги на собственный подарок');
        }
        const totalSumm = createOfferDto.amount + wish.raised;
        if (totalSumm > wish.price) {
            throw new common_1.ForbiddenException('Сумма взноса превышает стоимость подарка');
        }
        const offer = this.offersRepository.create(Object.assign(Object.assign({}, createOfferDto), { user: { id: user.id }, item: { id: createOfferDto.itemId } }));
        return this.offersRepository.save(offer);
    }
    async findAll() {
        const allOffers = await this.offersRepository.find({
            relations: {
                item: { owner: true },
                user: { wishes: true, offers: true },
            },
        });
        allOffers.forEach((offer) => {
            delete offer.user.password;
            delete offer.user.email;
            delete offer.item.owner.password;
            delete offer.item.owner.email;
        });
        return allOffers;
    }
    async findOne(id) {
        const offer = await this.offersRepository.findOne({
            where: { id: +id },
            relations: {
                item: { owner: true },
                user: { wishes: true, offers: true },
            },
        });
        delete offer.user.password;
        delete offer.user.email;
        delete offer.item.owner.password;
        delete offer.item.owner.email;
        return offer;
    }
};
OffersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        wishes_service_1.WishesService])
], OffersService);
exports.OffersService = OffersService;
//# sourceMappingURL=offers.service.js.map