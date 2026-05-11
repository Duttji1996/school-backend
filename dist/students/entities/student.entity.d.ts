import { User } from '../../users/entities/user.entity';
import { SchoolClass } from '../../curriculum/entities/school-class.entity';
export declare class Student {
    id: string;
    fullName: string;
    schoolClass: SchoolClass;
    section: string;
    rollNumber: string;
    dob: string;
    gender: string;
    fatherName: string;
    contactNo: string;
    motherName: string;
    aadharId: string;
    bloodGroup: string;
    admissionDate: string;
    address: string;
    status: 'active' | 'pending' | 'rejected';
    user: User;
    createdAt: Date;
}
