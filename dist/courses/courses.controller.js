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
import { Course } from './course.entity.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
let CoursesController = class CoursesController {
    courseRepository;
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    findAll() {
        return this.courseRepository.find();
    }
    findOne(id) {
        return this.courseRepository.findOne({ where: { id: Number(id) } });
    }
    async create(course) {
        console.log('Kurs qo\'shilmoqda:', course);
        const newCourse = this.courseRepository.create(course);
        return this.courseRepository.save(newCourse);
    }
    async update(id, course) {
        await this.courseRepository.update(Number(id), course);
        return this.courseRepository.findOne({ where: { id: Number(id) } });
    }
    remove(id) {
        this.courseRepository.delete(Number(id));
        return Promise.resolve();
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findOne", null);
__decorate([
    Post(),
    Roles('admin', 'teacher'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "create", null);
__decorate([
    Put(':id'),
    Roles('admin', 'teacher'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles('admin'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "remove", null);
CoursesController = __decorate([
    Controller('courses'),
    UseGuards(RolesGuard),
    __param(0, InjectRepository(Course)),
    __metadata("design:paramtypes", [Repository])
], CoursesController);
export { CoursesController };
//# sourceMappingURL=courses.controller.js.map