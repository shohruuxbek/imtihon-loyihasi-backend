import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity.js';
import { CreateTeacherDto } from './dto/create-teacher.dto.js';
import { User } from '../auth/user.entity.js';
export declare class TeachersController {
    private teacherRepository;
    private userRepository;
    constructor(teacherRepository: Repository<Teacher>, userRepository: Repository<User>);
    findAll(): Promise<Teacher[]>;
    findOne(id: string): Promise<Teacher | null>;
    create(teacherData: CreateTeacherDto): Promise<Teacher>;
    update(id: string, teacher: Partial<Teacher>): Promise<Teacher | null>;
    remove(id: string): Promise<void>;
}
