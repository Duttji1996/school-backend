import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboard(): Promise<{
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
            schoolClass: import("../curriculum/entities/school-class.entity").SchoolClass;
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
            user: import("../users/entities/user.entity").User;
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
            user: import("../users/entities/user.entity").User;
        }[];
        feeStructures: {
            className: string;
            monthlyFee: number;
            annualFee: number;
        }[];
    }>;
    registerTeacher(teacherData: any): Promise<import("../teachers/entities/teacher.entity").Teacher>;
    registerStudent(studentData: any): Promise<import("../students/entities/student.entity").Student>;
    updateStudent(id: string, studentData: any): Promise<import("../students/entities/student.entity").Student>;
}
