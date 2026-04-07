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
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CreateTeacherDto } from './dto/create-teacher.dto.js';
import { User } from '../auth/user.entity.js';
let TeachersController = class TeachersController {
    teacherRepository;
    userRepository;
    constructor(teacherRepository, userRepository) {
        this.teacherRepository = teacherRepository;
        this.userRepository = userRepository;
    }
    findAll() {
        return this.teacherRepository.find();
    }
    findOne(id) {
        return this.teacherRepository.findOne({ where: { id: Number(id) } });
    }
    async create(teacherData) {
        console.log('O\'qituvchi qo\'shilmoqda:', teacherData);
        if (!teacherData.username) {
            const baseUsername = teacherData.firstName.toLowerCase().replace(/\s/g, '') + '_' + teacherData.phone.slice(-4);
            let username = baseUsername;
            let counter = 1;
            while (await this.userRepository.findOne({ where: { username } })) {
                username = baseUsername + counter;
                counter++;
            }
            teacherData.username = username;
            teacherData.password = teacherData.phone.slice(-4) + Math.floor(1000 + Math.random() * 9000);
        }
        const newTeacher = this.teacherRepository.create(teacherData);
        const savedTeacher = await this.teacherRepository.save(newTeacher);
        const user = this.userRepository.create({
            username: savedTeacher.username,
            password: savedTeacher.password,
            role: 'teacher',
            fullName: `${savedTeacher.firstName} ${savedTeacher.lastName}`,
            isActive: true,
        });
        await this.userRepository.save(user);
        console.log('O\'qituvchi va foydalanuvchi muvaffaqiyatli yaratildi:', {
            username: savedTeacher.username,
            password: savedTeacher.password
        });
        return savedTeacher;
    }
    async update(id, teacher) {
        await this.teacherRepository.update(Number(id), teacher);
        return this.teacherRepository.findOne({ where: { id: Number(id) } });
    }
    remove(id) {
        this.teacherRepository.delete(Number(id));
        return Promise.resolve();
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeachersController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeachersController.prototype, "findOne", null);
__decorate([
    Post(),
    Roles('admin', 'teacher'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTeacherDto]),
    __metadata("design:returntype", Promise)
], TeachersController.prototype, "create", null);
__decorate([
    Put(':id'),
    Roles('admin', 'teacher'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TeachersController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles('admin'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeachersController.prototype, "remove", null);
TeachersController = __decorate([
    Controller('teachers'),
    UseGuards(RolesGuard),
    __param(0, InjectRepository(Teacher)),
    __param(1, InjectRepository(User)),
    __metadata("design:paramtypes", [Repository,
        Repository])
], TeachersController);
export { TeachersController };
//# sourceMappingURL=teachers.controller.js.map