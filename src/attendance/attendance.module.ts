import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceController } from './attendance.controller.js';
import { Attendance } from './attendance.entity.js';
import { Teacher } from '../teachers/teacher.entity.js';
import { Student } from '../students/student.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, Teacher, Student])],
  controllers: [AttendanceController],
})
export class AttendanceModule {}
