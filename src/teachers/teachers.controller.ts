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
import { Teacher } from './teacher.entity.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@Controller('teachers')
@UseGuards(RolesGuard)
export class TeachersController {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  @Get()
  findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Teacher | null> {
    return this.teacherRepository.findOne({ where: { id: Number(id) } });
  }

  @Post()
  @Roles('admin', 'teacher')
  create(@Body() teacher: Teacher): Promise<Teacher> {
    return this.teacherRepository.save(teacher);
  }

  @Put(':id')
  @Roles('admin', 'teacher')
  async update(
    @Param('id') id: string,
    @Body() teacher: Partial<Teacher>,
  ): Promise<Teacher | null> {
    await this.teacherRepository.update(Number(id), teacher);
    return this.teacherRepository.findOne({ where: { id: Number(id) } });
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string): Promise<void> {
    this.teacherRepository.delete(Number(id));
    return Promise.resolve();
  }
}
