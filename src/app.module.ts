import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { StudentsModule } from './students/students.module.js';
import { TeachersModule } from './teachers/teachers.module.js';
import { CoursesModule } from './courses/courses.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { AttendanceModule } from './attendance/attendance.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.NODE_ENV === 'production' ? 'postgres' : 'sqlite',
      url: process.env.DATABASE_URL,
      database: process.env.NODE_ENV !== 'production' ? 'oquv_markazi.db' : undefined,
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
      synchronize: true, // Production'da false qiling va migrations ishlating
      logging: process.env.NODE_ENV === 'development',
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
