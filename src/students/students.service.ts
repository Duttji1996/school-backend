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

  async create(studentData: Partial<Student>): Promise<Student> {
    const student = this.studentRepository.create(studentData);
    return this.studentRepository.save(student);
  }

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
      userId: userId,
      studentName: student.fullName,
      studentId: student.id,
      rollNumber: student.rollNumber || 'N/A',
      status: student.status,
      className: student.schoolClass?.name || 'Unassigned',
      section: student.section || 'A',
      profileImage: `https://ui-avatars.com/api/?name=${student.fullName}&background=fadb5f&color=0c1e33`,
      profileDetails: {
        dob: student.dob || '2015-01-01',
        gender: student.gender || 'Not Specified',
        fatherName: student.fatherName || 'N/A',
        motherName: student.motherName || 'N/A',
        aadharId: student.aadharId || 'N/A',
        contactNo: student.contactNo || 'N/A',
        address: student.address || 'N/A',
        bloodGroup: 'B+', 
        admissionDate: '2024-04-01' 
      },
      attendance: {
        totalDays: 0,
        presentDays: 0,
        absentDays: 0,
        percentage: 0
      },
      attendanceDetails: [], // No entries by default as requested
      holidayCalendar: [
        { date: '2026-01-26', name: 'Republic Day' },
        { date: '2026-03-03', name: 'Holi' },
        { date: '2026-03-26', name: 'Eid-ul-Fitr' },
        { date: '2026-04-14', name: 'Ambedkar Jayanti' },
        { date: '2026-06-07', name: 'Eid-ul-Adha' },
        { date: '2026-08-15', name: 'Independence Day' },
        { date: '2026-08-28', name: 'Raksha Bandhan' },
        { date: '2026-09-04', name: 'Janmashtami' },
        { date: '2026-10-02', name: 'Gandhi Jayanti' },
        { date: '2026-10-21', name: 'Dussehra' },
        { date: '2026-11-09', name: 'Diwali' },
        { date: '2026-12-25', name: 'Christmas' }
      ],
      progress: {
        overallPercentage: 0,
        remarks: 'Keep learning to see your progress here.',
        lastUpdated: new Date().toISOString()
      },
      recentExams: [],
      homework: [],
      feeDetails: {
        totalAnnualFee: 15000,
        paidAmount: 0,
        pendingAmount: 15000,
        paidTillMonth: 'None',
        lastPaymentDate: 'N/A'
      },
      paymentHistory: [],
      reviews: []
    };
  }
}
