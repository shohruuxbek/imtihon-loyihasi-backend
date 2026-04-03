import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Student } from './student.entity.js';
import { Teacher } from '../teachers/teacher.entity.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CreateStudentDto } from './dto/create-student.dto.js';

@Controller('students')
@UseGuards(RolesGuard)
export class StudentsController {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  @Get()
  @Roles('admin', 'teacher')
  async findAll(@Req() req: any): Promise<Student[]> {
    const user = req.user;
    
    // Admin barcha talabalarni ko'radi
    if (user.role === 'admin') {
      return this.studentRepository.find();
    }
    
    // O'qituvchi faqat o'z kursidagi talabalarni ko'radi
    if (user.role === 'teacher') {
      const teacher = await this.teacherRepository.findOne({ 
        where: { username: user.username } 
      });
      
      if (!teacher || !teacher.assignedCourses) {
        return [];
      }
      
      // Kurs ID larini ajratib olish
      const courseIds = teacher.assignedCourses.split(',').map(id => Number(id.trim()));
      
      // Talabalarni filtrash - courseId courseName orqali topiladi
      const allStudents = await this.studentRepository.find();
      return allStudents.filter(student => courseIds.includes(Number(student.courseId)));
    }
    
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Student | null> {
    return this.studentRepository.findOne({ where: { id: Number(id) } });
  }

  @Post()
  @Roles('admin', 'teacher')
  async create(@Body() student: CreateStudentDto, @Req() req: any): Promise<Student> {
    const user = req.user;
    console.log('Talaba qo\'shilmoqda:', student);
    
    // O'qituvchi faqat o'z kursidagi guruhga talaba qo'sha oladi
    if (user.role === 'teacher') {
      const teacher = await this.teacherRepository.findOne({ 
        where: { username: user.username } 
      });
      
      if (!teacher || !teacher.assignedCourses) {
        throw new Error('Sizning kursingiz yo\'q! Admin bilan bog\'laning.');
      }
      
      const courseIds = teacher.assignedCourses.split(',').map(id => Number(id.trim()));
      
      // Talaba qo'shilayotgan kursni tekshirish
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
