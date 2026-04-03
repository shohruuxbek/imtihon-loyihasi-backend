import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersController } from './teachers.controller.js';
import { Teacher } from './teacher.entity.js';
import { User } from '../auth/user.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, User])],
  controllers: [TeachersController],
})
export class TeachersModule {}
