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
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Attendance } from './attendance.entity.js';
import { Teacher } from '../teachers/teacher.entity.js';
import { Student } from '../students/student.entity.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CreateAttendanceDto } from './dto/create-attendance.dto.js';
let AttendanceController = class AttendanceController {
    attendanceRepository;
    teacherRepository;
    studentRepository;
    constructor(attendanceRepository, teacherRepository, studentRepository) {
        this.attendanceRepository = attendanceRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
    }
    async findAll(req) {
        const user = req.user;
        if (user.role === 'admin') {
            return this.attendanceRepository.find();
        }
        if (user.role === 'teacher') {
            const teacher = await this.teacherRepository.findOne({
                where: { username: user.username }
            });
            if (!teacher || !teacher.assignedCourses) {
                return [];
            }
            const courseIds = teacher.assignedCourses.split(',').map(id => Number(id.trim()));
            return this.attendanceRepository.find({
                where: { courseId: In(courseIds) }
            });
        }
        return [];
    }
    findOne(id) {
        return this.attendanceRepository.findOne({ where: { id: Number(id) } });
    }
    async create(attendance) {
        console.log('Davomat qo\'shilmoqda:', attendance);
        const newAttendance = this.attendanceRepository.create({
            ...attendance,
            date: new Date().toISOString().split('T')[0],
        });
        return this.attendanceRepository.save(newAttendance);
    }
    remove(id) {
        this.attendanceRepository.delete(Number(id));
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
], AttendanceController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findOne", null);
__decorate([
    Post(),
    Roles('admin', 'teacher'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "create", null);
__decorate([
    Delete(':id'),
    Roles('admin'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "remove", null);
AttendanceController = __decorate([
    Controller('attendance'),
    UseGuards(RolesGuard),
    __param(0, InjectRepository(Attendance)),
    __param(1, InjectRepository(Teacher)),
    __param(2, InjectRepository(Student)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository])
], AttendanceController);
export { AttendanceController };
//# sourceMappingURL=attendance.controller.js.map