import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity.js';
import { Teacher } from '../teachers/teacher.entity.js';
import { Student } from '../students/student.entity.js';
import { CreateAttendanceDto } from './dto/create-attendance.dto.js';
export declare class AttendanceController {
    private attendanceRepository;
    private teacherRepository;
    private studentRepository;
    constructor(attendanceRepository: Repository<Attendance>, teacherRepository: Repository<Teacher>, studentRepository: Repository<Student>);
    findAll(req: any): Promise<Attendance[]>;
    findOne(id: string): Promise<Attendance | null>;
    create(attendance: CreateAttendanceDto): Promise<Attendance>;
    remove(id: string): Promise<void>;
}
