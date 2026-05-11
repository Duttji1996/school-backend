import { Repository } from 'typeorm';
import { ExamResult } from './entities/exam-result.entity';
export declare class ExamsService {
    private examResultRepository;
    constructor(examResultRepository: Repository<ExamResult>);
    addResult(resultData: any): Promise<ExamResult>;
    getStudentResults(studentId: string): Promise<ExamResult[]>;
}
