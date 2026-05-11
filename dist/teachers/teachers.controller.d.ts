import { TeachersService } from './teachers.service';
export declare class TeachersController {
    private readonly teachersService;
    constructor(teachersService: TeachersService);
    getDashboard(userId: string): Promise<{
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
