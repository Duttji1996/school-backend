import { Repository } from 'typeorm';
import { Student } from '../students/entities/student.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { FeePayment } from '../finance/entities/fee-payment.entity';
import { SchoolClass } from '../curriculum/entities/school-class.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
export declare class AdminService {
    private studentRepository;
    private teacherRepository;
    private feePaymentRepository;
    private classRepository;
    private usersService;
    private mailService;
    constructor(studentRepository: Repository<Student>, teacherRepository: Repository<Teacher>, feePaymentRepository: Repository<FeePayment>, classRepository: Repository<SchoolClass>, usersService: UsersService, mailService: MailService);
    registerStudent(studentData: any): Promise<Student>;
    updateStudent(id: string, studentData: any): Promise<Student>;
    registerTeacher(teacherData: any): Promise<Teacher>;
    getDashboardStats(): Promise<{
        totalStudents: number;
        totalTeachers: number;
        totalFeesCollected: number;
        pendingFees: number;
        students: {
            name: string;
            email: string;
            className: string;
            attendance: number;
            feeStatus: string;
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
            status: "active" | "pending" | "rejected";
            user: User;
            createdAt: Date;
        }[];
        teachers: {
            name: string;
            email: string;
            id: string;
            fullName: string;
            subject: string;
            salary: number;
            joiningDate: string;
            lastSalaryCredited: string;
            attendancePercentage: number;
            user: User;
        }[];
        feeStructures: {
            className: string;
            monthlyFee: number;
            annualFee: number;
        }[];
    }>;
}
