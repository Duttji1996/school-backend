import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamResult } from './entities/exam-result.entity';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(ExamResult)
    private examResultRepository: Repository<ExamResult>,
  ) {}

  async addResult(resultData: any): Promise<ExamResult> {
    return await this.examResultRepository.save(resultData);
  }

  async getStudentResults(studentId: string): Promise<ExamResult[]> {
    return await this.examResultRepository.find({
      where: { student: { id: studentId } },
      order: { date: 'DESC' },
    });
  }
}
