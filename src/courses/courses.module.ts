import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller.js';
import { Course } from './course.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CoursesController],
})
export class CoursesModule {}
