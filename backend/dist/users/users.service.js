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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hash_service_1 = require("../hash/hash.service");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository, hashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
    }
    async create(createUserDto) {
        const { email, username } = createUserDto;
        const existUser = await this.userRepository.findOne({
            where: [{ email }, { username }],
        });
        if (existUser) {
            throw new common_1.ConflictException('Пользователь с таким email или username уже зарегистрирован');
        }
        const hash = await this.hashService.hash(createUserDto.password);
        const newUser = this.userRepository.create(Object.assign(Object.assign({}, createUserDto), { password: hash }));
        return this.userRepository.save(newUser);
    }
    findAll() {
        return this.userRepository.find();
    }
    async findOne(query) {
        return this.userRepository.findOne(query);
    }
    async findByUsername(username) {
        return await this.userRepository.findOne({ where: { username } });
    }
    async findBy({ query }) {
        const user = await this.userRepository.findOne({
            where: [{ email: query }, { username: query }],
        });
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        delete user.password;
        return user;
    }
    async findUserWishes(id) {
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
    async updateOne(id, updateUserDto) {
        const user = this.userRepository.findOne({ where: { id } });
        if (updateUserDto.password) {
            updateUserDto.password = await this.hashService.hash(updateUserDto.password);
        }
        const userUpdate = Object.assign(Object.assign({}, user), updateUserDto);
        await this.userRepository.update(id, userUpdate);
        const newUser = await this.findOne({ where: { id } });
        delete newUser.password;
        return newUser;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hash_service_1.HashService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map