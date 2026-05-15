import { StudentsService } from './students.service';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    getDashboard(userId: string): Promise<{
        userId: string;
        studentName: string;
        studentId: string;
        rollNumber: string;
        status: "pending" | "active" | "rejected";
        className: string;
        section: string;
        profileImage: string;
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
        attendance: {
            totalDays: number;
            presentDays: number;
            absentDays: number;
            percentage: number;
        };
        attendanceDetails: never[];
        holidayCalendar: {
            date: string;
            name: string;
        }[];
        progress: {
            overallPercentage: number;
            remarks: string;
            lastUpdated: string;
        };
        recentExams: never[];
        homework: never[];
        feeDetails: {
            totalAnnualFee: number;
            paidAmount: number;
            pendingAmount: number;
            paidTillMonth: string;
            lastPaymentDate: string;
        };
        paymentHistory: never[];
        reviews: never[];
    }>;
}
