import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { StudentsModule } from './students/students.module.js';
import { TeachersModule } from './teachers/teachers.module.js';
import { CoursesModule } from './courses/courses.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { AttendanceModule } from './attendance/attendance.module.js';
import { AuthModule } from './auth/auth.module.js';
import { Student } from './students/student.entity.js';
import { Teacher } from './teachers/teacher.entity.js';
import { Course } from './courses/course.entity.js';
import { Payment } from './payments/payment.entity.js';
import { Attendance } from './attendance/attendance.entity.js';
import { User } from './auth/user.entity.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Student, Teacher, Course, Payment, Attendance, User],
      synchronize: true,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      extra: {
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      },
    }),
    StudentsModule,
    TeachersModule,
    CoursesModule,
    PaymentsModule,
    AttendanceModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
