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
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity.js';
import { Teacher } from '../teachers/teacher.entity.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CreateStudentDto } from './dto/create-student.dto.js';
let StudentsController = class StudentsController {
    studentRepository;
    teacherRepository;
    constructor(studentRepository, teacherRepository) {
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
    }
    async findAll(req) {
        const user = req.user;
        if (user.role === 'admin') {
            return this.studentRepository.find();
        }
        if (user.role === 'teacher') {
            const teacher = await this.teacherRepository.findOne({
                where: { username: user.username }
            });
            if (!teacher || !teacher.assignedCourses) {
                return [];
            }
            const courseIds = teacher.assignedCourses.split(',').map(id => Number(id.trim()));
            const allStudents = await this.studentRepository.find();
            return allStudents.filter(student => courseIds.includes(Number(student.courseId)));
        }
        return [];
    }
    findOne(id) {
        return this.studentRepository.findOne({ where: { id: Number(id) } });
    }
    async create(student, req) {
        const user = req.user;
        console.log('Talaba qo\'shilmoqda:', student);
        if (user.role === 'teacher') {
            const teacher = await this.teacherRepository.findOne({
                where: { username: user.username }
            });
            if (!teacher || !teacher.assignedCourses) {
                throw new Error('Sizning kursingiz yo\'q! Admin bilan bog\'laning.');
            }
            const courseIds = teacher.assignedCourses.split(',').map(id => Number(id.trim()));
            if (!courseIds.includes(Number(student.courseId))) {
                throw new Error('Siz faqat o\'z kursingizdagi guruhga talaba qo\'sha olasiz!');
            }
        }
        const newStudent = this.studentRepository.create({
            ...student,
            enrolledDate: new Date().toISOString().split('T')[0],
        });
        return this.studentRepository.save(newStudent);
    }
    async update(id, student) {
        await this.studentRepository.update(Number(id), student);
        return this.studentRepository.findOne({ where: { id: Number(id) } });
    }
    remove(id) {
        this.studentRepository.delete(Number(id));
        return Promise.resolve();
    }
};
__decorate([
    Get(),
    Roles('admin', 'teacher'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findOne", null);
__decorate([
    Post(),
    Roles('admin', 'teacher'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateStudentDto, Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "create", null);
__decorate([
    Put(':id'),
    Roles('admin', 'teacher'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles('admin'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "remove", null);
StudentsController = __decorate([
    Controller('students'),
    UseGuards(RolesGuard),
    __param(0, InjectRepository(Student)),
    __param(1, InjectRepository(Teacher)),
    __metadata("design:paramtypes", [Repository,
        Repository])
], StudentsController);
export { StudentsController };
//# sourceMappingURL=students.controller.js.map