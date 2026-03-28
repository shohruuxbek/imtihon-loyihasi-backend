import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@Controller('students')
@UseGuards(RolesGuard)
export class StudentsController {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  @Get()
  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Student | null> {
    return this.studentRepository.findOne({ where: { id: Number(id) } });
  }

  @Post()
  @Roles('admin', 'teacher')
  create(@Body() student: Student): Promise<Student> {
    student.enrolledDate = new Date().toISOString().split('T')[0];
    return this.studentRepository.save(student);
  }

  @Put(':id')
  @Roles('admin', 'teacher')
  async update(
    @Param('id') id: string,
    @Body() student: Partial<Student>,
  ): Promise<Student | null> {
    await this.studentRepository.update(Number(id), student);
    return this.studentRepository.findOne({ where: { id: Number(id) } });
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string): Promise<void> {
    this.studentRepository.delete(Number(id));
    return Promise.resolve();
  }
}
