import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Attendance } from './attendance.entity.js';
import { Teacher } from '../teachers/teacher.entity.js';
import { Student } from '../students/student.entity.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CreateAttendanceDto } from './dto/create-attendance.dto.js';

@Controller('attendance')
@UseGuards(RolesGuard)
export class AttendanceController {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  @Get()
  @Roles('admin', 'teacher')
  async findAll(@Req() req: any): Promise<Attendance[]> {
    const user = req.user;
    
    // Admin barcha davomatlarni ko'radi
    if (user.role === 'admin') {
      return this.attendanceRepository.find();
    }
    
    // O'qituvchi faqat o'z kursidagi davomatlarni ko'radi
    if (user.role === 'teacher') {
      const teacher = await this.teacherRepository.findOne({ 
        where: { username: user.username } 
      });
      
      if (!teacher || !teacher.assignedCourses) {
        return [];
      }
      
      // Kurs ID larini ajratib olish
      const courseIds = teacher.assignedCourses.split(',').map(id => Number(id.trim()));
      
      // Davomatni filtrash
      return this.attendanceRepository.find({ 
        where: { courseId: In(courseIds) }
      });
    }
    
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Attendance | null> {
    return this.attendanceRepository.findOne({ where: { id: Number(id) } });
  }

  @Post()
  @Roles('admin', 'teacher')
  async create(@Body() attendance: CreateAttendanceDto): Promise<Attendance> {
    console.log('Davomat qo\'shilmoqda:', attendance);
    const newAttendance = this.attendanceRepository.create({
      ...attendance,
      date: new Date().toISOString().split('T')[0],
    });
    return this.attendanceRepository.save(newAttendance);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string): Promise<void> {
    this.attendanceRepository.delete(Number(id));
    return Promise.resolve();
  }
}
