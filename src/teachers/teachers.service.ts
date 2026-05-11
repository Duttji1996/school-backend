import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async getTeacherDashboard(userId: string) {
    const teacher = await this.teacherRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!teacher) {
      throw new NotFoundException('Teacher profile not found');
    }

    return {
      teacherName: teacher.fullName,
      teacherId: teacher.id,
      subject: teacher.subject,
      salary: teacher.salary,
      attendance: 98, // Mock
      classes: [
        { name: 'Class 4', section: 'A', students: 35 },
        { name: 'Class 5', section: 'B', students: 28 }
      ],
      announcements: [
        { title: 'Faculty Meeting', date: '2026-05-12', content: 'Meeting at 3 PM in the lounge.' }
      ]
    };
  }
}
