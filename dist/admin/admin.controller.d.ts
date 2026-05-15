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
            id: string;
            name: string;
            fullName: string;
            studentName: string;
            email: string;
            className: string;
            section: string;
            status: "active" | "pending" | "rejected";
            admissionDate: string;
            rollNo: string;
            attendance: number;
            feeStatus: string;
            fatherName: string;
            motherName: string;
            aadharId: string;
            dob: string;
            gender: string;
            bloodGroup: string;
            address: string;
            contactNo: string;
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
            address: string;
            contactNo: string;
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
    updateTeacher(id: string, teacherData: any): Promise<import("../teachers/entities/teacher.entity").Teacher>;
    approveStudent(id: string): Promise<import("../students/entities/student.entity").Student>;
    getCirculars(): Promise<import("../communications/entities/circular.entity").Circular[]>;
    createCircular(data: any): Promise<import("../communications/entities/circular.entity").Circular[]>;
    deleteCircular(id: string): Promise<import("typeorm").DeleteResult>;
    getContacts(): Promise<import("../contact/entities/contact.entity").Contact[]>;
}
