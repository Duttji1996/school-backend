import { Subject } from '../../curriculum/entities/subject.entity';
import { SchoolClass } from '../../curriculum/entities/school-class.entity';
export declare class Homework {
    id: string;
    subject: Subject;
    schoolClass: SchoolClass;
    title: string;
    description: string;
    dueDate: string;
    createdAt: Date;
}
