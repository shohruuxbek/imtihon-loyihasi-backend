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
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';
let AuthService = class AuthService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async validateUser(username, password) {
        console.log('Login attempt:', { username, password });
        const user = await this.userRepository.findOne({ where: { username } });
        console.log('Found user:', user);
        if (user && user.password === password && user.isActive) {
            const { password, ...result } = user;
            return result;
        }
        if (!user) {
            console.log('User not found');
        }
        else if (user.password !== password) {
            console.log('Password mismatch. Stored:', user.password, 'Entered:', password);
        }
        else if (!user.isActive) {
            console.log('User is not active');
        }
        return null;
    }
    async login(user) {
        console.log('Login successful for user:', user);
        return {
            access_token: `token_${user.username}_${user.role}`,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                fullName: user.fullName,
                email: user.email,
            },
        };
    }
    async register(userData) {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }
    async findAllUsers() {
        return this.userRepository.find();
    }
    async createAdminUser() {
        const adminUser = {
            username: 'admin',
            password: 'SeonAkademiya2024!',
            role: 'admin',
            fullName: 'SEON AKADEMIYA Admin',
        };
        const existingAdmin = await this.userRepository.findOne({
            where: { username: adminUser.username },
        });
        if (!existingAdmin) {
            await this.userRepository.save(adminUser);
            console.log('✅ Admin foydalanuvchi yaratildi:', adminUser);
        }
    }
};
AuthService = __decorate([
    Injectable(),
    __param(0, InjectRepository(User)),
    __metadata("design:paramtypes", [Repository])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map