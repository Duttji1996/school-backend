import { HomeworkService } from './homework.service';
export declare class HomeworkController {
    private readonly homeworkService;
    constructor(homeworkService: HomeworkService);
    create(homeworkData: any): Promise<import("./entities/homework.entity").Homework>;
    findByClass(classId: number): Promise<import("./entities/homework.entity").Homework[]>;
}
