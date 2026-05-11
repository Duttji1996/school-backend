import { User } from '../../users/entities/user.entity';
export declare class Teacher {
    id: string;
    fullName: string;
    subject: string;
    salary: number;
    joiningDate: string;
    lastSalaryCredited: string;
    attendancePercentage: number;
    user: User;
}
