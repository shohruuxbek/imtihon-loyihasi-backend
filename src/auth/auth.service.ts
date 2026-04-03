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
    console.log('Login successful for user:', user);
    return {
      access_token: `token_${user.username}_${user.role}`,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        fullName: user.fullName,
        email: user.email,
      },
    };
  }

  async register(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Faqat admin foydalanuvchini yaratish
  async createAdminUser() {
    const adminUser = {
      username: 'admin',
      password: 'SeonAkademiya2024!',
      role: 'admin',
      fullName: 'SEON AKADEMIYA Admin',
    };

    const existingAdmin = await this.userRepository.findOne({
      where: { username: adminUser.username },
    });
    
    if (!existingAdmin) {
      await this.userRepository.save(adminUser);
      console.log('✅ Admin foydalanuvchi yaratildi:', adminUser);
    }
  }
}
