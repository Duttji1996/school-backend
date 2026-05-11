import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeePayment } from './entities/fee-payment.entity';
import { SalaryPayment } from './entities/salary-payment.entity';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(FeePayment)
    private feePaymentRepository: Repository<FeePayment>,
    @InjectRepository(SalaryPayment)
    private salaryPaymentRepository: Repository<SalaryPayment>,
  ) {}

  async payFees(paymentData: any): Promise<FeePayment> {
    return await this.feePaymentRepository.save(paymentData);
  }

  async creditSalary(salaryData: any): Promise<SalaryPayment> {
    return await this.salaryPaymentRepository.save(salaryData);
  }

  async getStudentFees(studentId: string): Promise<FeePayment[]> {
    return await this.feePaymentRepository.find({
      where: { student: { id: studentId } },
      order: { paymentDate: 'DESC' },
    });
  }
}
