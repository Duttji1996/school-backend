import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { FinanceService } from './finance.service';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post('pay-fees')
  payFees(@Body() paymentData: any) {
    return this.financeService.payFees(paymentData);
  }

  @Post('credit-salary')
  creditSalary(@Body() salaryData: any) {
    return this.financeService.creditSalary(salaryData);
  }

  @Get('fees/:studentId')
  getStudentFees(@Param('studentId') studentId: string) {
    return this.financeService.getStudentFees(studentId);
  }
}
