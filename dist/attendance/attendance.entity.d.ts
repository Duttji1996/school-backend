import { User } from '../users/entities/user.entity';
export declare class Attendance {
    id: string;
    user: User;
    date: string;
    status: string;
    remarks: string;
}
