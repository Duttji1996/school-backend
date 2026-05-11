import { Student } from '../../students/entities/student.entity';
export declare class FeePayment {
    id: string;
    student: Student;
    amount: number;
    paymentDate: string;
    receiptNumber: string;
    method: string;
    createdAt: Date;
}
