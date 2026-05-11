import { Repository } from 'typeorm';
import { FeePayment } from './entities/fee-payment.entity';
import { SalaryPayment } from './entities/salary-payment.entity';
export declare class FinanceService {
    private feePaymentRepository;
    private salaryPaymentRepository;
    constructor(feePaymentRepository: Repository<FeePayment>, salaryPaymentRepository: Repository<SalaryPayment>);
    payFees(paymentData: any): Promise<FeePayment>;
    creditSalary(salaryData: any): Promise<SalaryPayment>;
    getStudentFees(studentId: string): Promise<FeePayment[]>;
}
