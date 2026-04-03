import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { AuthService } from './auth/auth.service.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS yoqish - barcha originlarga ruxsat
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false, // Production'da true qiling
      transform: true,
    }),
  );

  // Admin foydalanuvchini avtomatik yaratish
  const authService = app.get(AuthService);
  await authService.createAdminUser();
  console.log('✅ Admin foydalanuvchi avtomatik yaratildi');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Backend ishga tushdi: http://localhost:${port}`);
}

bootstrap();
