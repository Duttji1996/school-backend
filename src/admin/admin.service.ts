import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../students/entities/student.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { FeePayment } from '../finance/entities/fee-payment.entity';
import { FeeStructure } from '../curriculum/entities/fee-structure.entity';
import { SchoolClass } from '../curriculum/entities/school-class.entity';
import { User, UserRole } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(FeePayment)
    private feePaymentRepository: Repository<FeePayment>,
    @InjectRepository(SchoolClass)
    private classRepository: Repository<SchoolClass>,
    private usersService: UsersService,
    private mailService: MailService,
  ) {}

  async registerStudent(studentData: any) {
    try {
      const tempPassword = Math.random().toString(36).slice(-8);

      const isStudentExists = await this.usersService.findOneByEmail(studentData.email);
      if (isStudentExists) {
        throw new ConflictException('Email already registered');
      }
      
      const user = await this.usersService.create({
        email: studentData.email,
        password: tempPassword,
        role: UserRole.STUDENT,
      });

      // Find or Create Class
      let schoolClass = await this.classRepository.findOne({ where: { name: studentData.className } });
      if (!schoolClass) {
        schoolClass = await this.classRepository.save({ name: studentData.className });
      }

      // Generate Plain Numeric Roll Number: YYYYMMDD + ClassID + SEQ
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const classId = studentData.className.match(/\d+/) ? studentData.className.match(/\d+/)[0].padStart(2, '0') : '00';
      
      const count = await this.studentRepository.count({
        where: { section: studentData.section }
      });
      const sequence = (count + 1).toString().padStart(3, '0');
      
      const autoRollNumber = `${year}${month}${day}${classId}${sequence}`;

      const student = this.studentRepository.create({
        fullName: studentData.name,
        section: studentData.section,
        rollNumber: autoRollNumber,
        dob: studentData.dob,
        gender: studentData.gender,
        fatherName: studentData.fatherName,
        motherName: studentData.motherName,
        aadharId: studentData.aadharId,
        bloodGroup: studentData.bloodGroup,
        admissionDate: studentData.admissionDate || new Date().toISOString().split('T')[0],
        contactNo: studentData.contactNo,
        address: studentData.address,
        status: 'active',
        user: user,
        schoolClass: schoolClass,
      });
      
      const savedStudent = await this.studentRepository.save(student);
      
      // Send email
      void this.mailService.sendCredentials(studentData.email, studentData.name, tempPassword, 'Student');
      
      return savedStudent;
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new Error('Internal registration error: ' + error.message);
    }
  }

  async updateStudent(id: string, studentData: any) {
    const student = await this.studentRepository.findOne({ 
      where: { id },
      relations: ['user', 'schoolClass'] 
    });
    if (!student) throw new NotFoundException('Student not found');

    // Update fields
    if (studentData.name) student.fullName = studentData.name;
    if (studentData.section) student.section = studentData.section;
    if (studentData.dob) student.dob = studentData.dob;
    if (studentData.gender) student.gender = studentData.gender;
    if (studentData.fatherName) student.fatherName = studentData.fatherName;
    if (studentData.motherName) student.motherName = studentData.motherName;
    if (studentData.aadharId) student.aadharId = studentData.aadharId;
    if (studentData.bloodGroup) student.bloodGroup = studentData.bloodGroup;
    if (studentData.admissionDate) student.admissionDate = studentData.admissionDate;
    if (studentData.contactNo) student.contactNo = studentData.contactNo;
    if (studentData.address) student.address = studentData.address;
    if (studentData.status) student.status = studentData.status;

    // Handle class update if provided
    if (studentData.className) {
      let schoolClass = await this.classRepository.findOne({ where: { name: studentData.className } });
      if (!schoolClass) {
        schoolClass = await this.classRepository.save({ name: studentData.className });
      }
      student.schoolClass = schoolClass;
    }

    return this.studentRepository.save(student);
  }

  async approveStudent(id: string) {
    const student = await this.studentRepository.findOne({ 
      where: { id },
      relations: ['user']
    });
    if (!student) throw new NotFoundException('Student not found');
    
    student.status = 'active';
    const updated = await this.studentRepository.save(student);

    // Notify user about approval
    if (updated.user?.email) {
      void this.mailService.sendEnrollmentApproval(updated.user.email, updated.fullName);
    }

    return updated;
  }

  async registerTeacher(teacherData: any) {
    const tempPassword = Math.random().toString(36).slice(-8);

    const isTeacherExists = await this.usersService.findOneByEmail(teacherData.email);
    if (isTeacherExists) {
      throw new Error('Email already registered');
    }

    const user = await this.usersService.create({
      email: teacherData.email,
      password: tempPassword,
      role: UserRole.TEACHER,
    });

    const teacher = this.teacherRepository.create({
      fullName: teacherData.name, // Map name to fullName
      subject: teacherData.subject,
      salary: teacherData.salary,
      joiningDate: new Date().toISOString().split('T')[0], // Default joining date
      user: user,
    });
    
    const savedTeacher = await this.teacherRepository.save(teacher);
    
    // Send email
    void this.mailService.sendCredentials(teacherData.email, teacherData.name, tempPassword, 'Teacher');
    
    return savedTeacher;
  }

  async getDashboardStats() {
    const totalStudents = await this.studentRepository.count();
    const totalTeachers = await this.teacherRepository.count();
    
    // Sum of all fee payments
    const feesResult = await this.feePaymentRepository
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'total')
      .getRawOne();
      
    // Include 'user' and 'schoolClass' relations
    const students = (await this.studentRepository.find({ 
      relations: ['schoolClass', 'user'],
      order: { createdAt: 'DESC' }
    })).map(s => ({
      id: s.id,
      name: s.fullName,
      fullName: s.fullName,
      studentName: s.fullName,
      email: s.user?.email || 'N/A', 
      className: s.schoolClass?.name || 'Unassigned',
      section: s.section,
      status: s.status,
      admissionDate: s.admissionDate || new Date().toISOString().split('T')[0],
      rollNo: s.rollNumber,
      attendance: 92, 
      feeStatus: s.status === 'active' ? 'Paid' : 'Pending'
    }));
    
    const teachers = (await this.teacherRepository.find({ relations: ['user'] })).map(t => ({
      ...t,
      name: t.fullName,
      email: t.user?.email
    }));
    
    return {
      totalStudents,
      totalTeachers,
      totalFeesCollected: parseFloat(feesResult.total || '0'),
      pendingFees: 450000, // Dummy for now
      students,
      teachers,
      feeStructures: [
        { className: 'Class 1', monthlyFee: 2500, annualFee: 30000 },
        { className: 'Class 2', monthlyFee: 2700, annualFee: 32400 },
        { className: 'Class 3', monthlyFee: 3000, annualFee: 36000 },
        { className: 'Class 4', monthlyFee: 3200, annualFee: 38400 },
        { className: 'Class 5', monthlyFee: 3500, annualFee: 42000 }
      ]
    };
  }
}
