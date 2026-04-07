import { Repository } from 'typeorm';
import { Course } from './course.entity.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
export declare class CoursesController {
    private courseRepository;
    constructor(courseRepository: Repository<Course>);
    findAll(): Promise<Course[]>;
    findOne(id: string): Promise<Course | null>;
    create(course: CreateCourseDto): Promise<Course>;
    update(id: string, course: Partial<Course>): Promise<Course | null>;
    remove(id: string): Promise<void>;
}
