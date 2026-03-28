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
import { Course } from './course.entity.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@Controller('courses')
@UseGuards(RolesGuard)
export class CoursesController {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  @Get()
  findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Course | null> {
    return this.courseRepository.findOne({ where: { id: Number(id) } });
  }

  @Post()
  @Roles('admin', 'teacher')
  create(@Body() course: Course): Promise<Course> {
    return this.courseRepository.save(course);
  }

  @Put(':id')
  @Roles('admin', 'teacher')
  async update(
    @Param('id') id: string,
    @Body() course: Partial<Course>,
  ): Promise<Course | null> {
    await this.courseRepository.update(Number(id), course);
    return this.courseRepository.findOne({ where: { id: Number(id) } });
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string): Promise<void> {
    this.courseRepository.delete(Number(id));
    return Promise.resolve();
  }
}
