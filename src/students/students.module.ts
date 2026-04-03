import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsController } from './students.controller.js';
import { Student } from './student.entity.js';
import { Teacher } from '../teachers/teacher.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Teacher])],
  controllers: [StudentsController],
})
export class StudentsModule {}
