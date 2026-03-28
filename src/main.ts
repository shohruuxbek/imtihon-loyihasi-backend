import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

let app;

async function bootstrap() {
  // Serverless environment uchun - faqat bir marta create qilish
  if (!app) {
    app = await NestFactory.create(AppModule);
    
    // CORS yoqish - barcha originlarga ruxsat (production uchun)
    app.enableCors({
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    });

    // Global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
  }

  return app;
}

// Vercel Serverless uchun export
export default async function handler(req: any, res: any) {
  const nestApp = await bootstrap();
  await nestApp.handleRequest(req, res);
}

// Development mode uchun
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}
