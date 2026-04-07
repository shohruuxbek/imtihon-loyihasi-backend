import { Repository } from 'typeorm';
import { Student } from './student.entity.js';
import { Teacher } from '../teachers/teacher.entity.js';
import { CreateStudentDto } from './dto/create-student.dto.js';
export declare class StudentsController {
    private studentRepository;
    private teacherRepository;
    constructor(studentRepository: Repository<Student>, teacherRepository: Repository<Teacher>);
    findAll(req: any): Promise<Student[]>;
    findOne(id: string): Promise<Student | null>;
    create(student: CreateStudentDto, req: any): Promise<Student>;
    update(id: string, student: Partial<Student>): Promise<Student | null>;
    remove(id: string): Promise<void>;
}
