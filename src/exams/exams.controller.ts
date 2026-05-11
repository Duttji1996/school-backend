import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ExamsService } from './exams.service';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post('result')
  addResult(@Body() resultData: any) {
    return this.examsService.addResult(resultData);
  }

  @Get('results/:studentId')
  getStudentResults(@Param('studentId') studentId: string) {
    return this.examsService.getStudentResults(studentId);
  }
}
