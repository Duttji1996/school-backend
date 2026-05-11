import { FinanceService } from './finance.service';
export declare class FinanceController {
    private readonly financeService;
    constructor(financeService: FinanceService);
    payFees(paymentData: any): Promise<import("./entities/fee-payment.entity").FeePayment>;
    creditSalary(salaryData: any): Promise<import("./entities/salary-payment.entity").SalaryPayment>;
    getStudentFees(studentId: string): Promise<import("./entities/fee-payment.entity").FeePayment[]>;
}
