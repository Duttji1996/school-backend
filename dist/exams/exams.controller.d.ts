import { ExamsService } from './exams.service';
export declare class ExamsController {
    private readonly examsService;
    constructor(examsService: ExamsService);
    addResult(resultData: any): Promise<import("./entities/exam-result.entity").ExamResult>;
    getStudentResults(studentId: string): Promise<import("./entities/exam-result.entity").ExamResult[]>;
}
