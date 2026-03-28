import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log('Login attempt:', { username, password });
    const user = await this.userRepository.findOne({ where: { username } });
    console.log('Found user:', user);
    
    if (user && user.password === password && user.isActive) {
      const { password, ...result } = user;
      return result;
    }
    
    if (!user) {
      console.log('User not found');
    } else if (user.password !== password) {
      console.log('Password mismatch. Stored:', user.password, 'Entered:', password);
    } else if (!user.isActive) {
      console.log('User is not active');
    }
    
    return null;
  }

  async login(user: any) {
    return {
      access_token: `token_${user.username}_${user.role}`,
      user: user,
    };
  }

  async register(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Demo foydalanuvchilarni yaratish
  async createDemoUsers() {
    const users = [
      {
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        fullName: 'Admin User',
      },
      {
        username: 'teacher1',
        password: 'teacher123',
        role: 'teacher',
        fullName: 'Teacher One',
      },
      {
        username: 'student1',
        password: 'student123',
        role: 'student',
        fullName: 'Student One',
      },
    ];

    for (const userData of users) {
      const existingUser = await this.userRepository.findOne({
        where: { username: userData.username },
      });
      if (!existingUser) {
        await this.userRepository.save(userData);
      }
    }
  }
}
