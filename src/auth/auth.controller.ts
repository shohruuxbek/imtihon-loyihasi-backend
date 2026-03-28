import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { User } from './user.entity.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      return { message: 'Login yoki parol noto\'g\'ri' };
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() userData: Partial<User>) {
    return this.authService.register(userData);
  }

  @Get('users')
  async findAllUsers() {
    return this.authService.findAllUsers();
  }

  @Post('init-demo')
  async initDemoUsers() {
    await this.authService.createDemoUsers();
    return { message: 'Demo foydalanuvchilar yaratildi' };
  }
}
