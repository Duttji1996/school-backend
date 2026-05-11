import { StudentsService } from './students.service';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    getDashboard(userId: string): Promise<{
        studentName: string;
        studentId: string;
        rollNumber: string;
        className: string;
        section: string;
        attendance: number;
        fees: {
            total: number;
            paid: number;
            balance: number;
            status: string;
        };
        homework: {
            subject: string;
            task: string;
            dueDate: string;
            status: string;
        }[];
        profileDetails: {
            dob: string;
            gender: string;
            fatherName: string;
            motherName: string;
            aadharId: string;
            contactNo: string;
            address: string;
            bloodGroup: string;
            admissionDate: string;
        };
    }>;
}
