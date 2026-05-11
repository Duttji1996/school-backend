import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Homework } from './entities/homework.entity';

@Injectable()
export class HomeworkService {
  constructor(
    @InjectRepository(Homework)
    private homeworkRepository: Repository<Homework>,
  ) {}

  async create(homeworkData: any): Promise<Homework> {
    return await this.homeworkRepository.save(homeworkData);
  }

  async findByClass(classId: number): Promise<Homework[]> {
    return await this.homeworkRepository.find({
      where: { schoolClass: { id: classId } },
      order: { createdAt: 'DESC' },
    });
  }
}
