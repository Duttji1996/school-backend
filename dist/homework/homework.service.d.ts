import { Repository } from 'typeorm';
import { Homework } from './entities/homework.entity';
export declare class HomeworkService {
    private homeworkRepository;
    constructor(homeworkRepository: Repository<Homework>);
    create(homeworkData: any): Promise<Homework>;
    findByClass(classId: number): Promise<Homework[]>;
}
