import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@Controller('attendance')
@UseGuards(RolesGuard)
export class AttendanceController {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  @Get()
  findAll(): Promise<Attendance[]> {
    return this.attendanceRepository.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Attendance | null> {
    return this.attendanceRepository.findOne({ where: { id: Number(id) } });
  }

  @Post()
  @Roles('admin', 'teacher')
  create(@Body() attendance: Attendance): Promise<Attendance> {
    attendance.date = new Date().toISOString().split('T')[0];
    return this.attendanceRepository.save(attendance);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string): Promise<void> {
    this.attendanceRepository.delete(Number(id));
    return Promise.resolve();
  }
}
