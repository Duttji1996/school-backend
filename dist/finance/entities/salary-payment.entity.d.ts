import { Teacher } from '../../teachers/entities/teacher.entity';
export declare class SalaryPayment {
    id: string;
    teacher: Teacher;
    amount: number;
    creditDate: string;
    transactionId: string;
    createdAt: Date;
}
