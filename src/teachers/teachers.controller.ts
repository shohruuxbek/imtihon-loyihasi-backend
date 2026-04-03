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
import { CreateTeacherDto } from './dto/create-teacher.dto.js';
import { User } from '../auth/user.entity.js';

@Controller('teachers')
@UseGuards(RolesGuard)
export class TeachersController {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
  async create(@Body() teacherData: CreateTeacherDto): Promise<Teacher> {
    console.log('O\'qituvchi qo\'shilmoqda:', teacherData);
    
    // Agar username kiritilmagan bo'lsa, avtomatik yaratish
    if (!teacherData.username) {
      const baseUsername = teacherData.firstName.toLowerCase().replace(/\s/g, '') + '_' + teacherData.phone.slice(-4);
      let username = baseUsername;
      let counter = 1;
      
      // Unikal username topish
      while (await this.userRepository.findOne({ where: { username } })) {
        username = baseUsername + counter;
        counter++;
      }
      
      teacherData.username = username;
      
      // Parol yaratish (telefon oxirgi 4 ta raqam + random)
      teacherData.password = teacherData.phone.slice(-4) + Math.floor(1000 + Math.random() * 9000);
    }
    
    const newTeacher = this.teacherRepository.create(teacherData);
    const savedTeacher = await this.teacherRepository.save(newTeacher);
    
    // User account yaratish
    const user = this.userRepository.create({
      username: savedTeacher.username,
      password: savedTeacher.password,
      role: 'teacher',
      fullName: `${savedTeacher.firstName} ${savedTeacher.lastName}`,
      isActive: true,
    });
    await this.userRepository.save(user);
    
    console.log('O\'qituvchi va foydalanuvchi muvaffaqiyatli yaratildi:', { 
      username: savedTeacher.username, 
      password: savedTeacher.password 
    });
    
    return savedTeacher;
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
