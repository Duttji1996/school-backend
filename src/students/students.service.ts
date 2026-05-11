import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async getStudentDashboard(userId: string) {
    const student = await this.studentRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'schoolClass'],
    });

    if (!student) {
      throw new NotFoundException('Student profile not found');
    }

    // Mapping to frontend model
    return {
      studentName: student.fullName,
      studentId: student.id,
      rollNumber: student.rollNumber,
      className: student.schoolClass?.name || 'Unassigned',
      section: student.section,
      attendance: 95, // Mock for now
      fees: {
        total: 15000,
        paid: 5000,
        balance: 10000,
        status: 'partial'
      },
      homework: [
        { subject: 'Mathematics', task: 'Exercise 4.2', dueDate: '2026-05-15', status: 'pending' },
        { subject: 'English', task: 'Essay on Environment', dueDate: '2026-05-14', status: 'completed' }
      ],
      profileDetails: {
        dob: student.dob,
        gender: student.gender,
        fatherName: student.fatherName,
        motherName: student.motherName,
        aadharId: student.aadharId,
        contactNo: student.contactNo,
        address: student.address,
        bloodGroup: 'B+', 
        admissionDate: '2024-04-01' 
      }
    };
  }
}
