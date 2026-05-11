import { Student } from '../../students/entities/student.entity';
import { Subject } from '../../curriculum/entities/subject.entity';
export declare class ExamResult {
    id: string;
    student: Student;
    subject: Subject;
    examName: string;
    totalMarks: number;
    obtainedMarks: number;
    grade: string;
    date: string;
}
