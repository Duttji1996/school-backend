import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
export declare class TeachersService {
    private teacherRepository;
    constructor(teacherRepository: Repository<Teacher>);
    getTeacherDashboard(userId: string): Promise<{
        teacherName: string;
        teacherId: string;
        subject: string;
        salary: number;
        attendance: number;
        classes: {
            name: string;
            section: string;
            students: number;
        }[];
        announcements: {
            title: string;
            date: string;
            content: string;
        }[];
    }>;
}
