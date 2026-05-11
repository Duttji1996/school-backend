"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("../students/entities/student.entity");
const teacher_entity_1 = require("../teachers/entities/teacher.entity");
const fee_payment_entity_1 = require("../finance/entities/fee-payment.entity");
const school_class_entity_1 = require("../curriculum/entities/school-class.entity");
const user_entity_1 = require("../users/entities/user.entity");
const users_service_1 = require("../users/users.service");
const mail_service_1 = require("../mail/mail.service");
let AdminService = class AdminService {
    studentRepository;
    teacherRepository;
    feePaymentRepository;
    classRepository;
    usersService;
    mailService;
    constructor(studentRepository, teacherRepository, feePaymentRepository, classRepository, usersService, mailService) {
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.feePaymentRepository = feePaymentRepository;
        this.classRepository = classRepository;
        this.usersService = usersService;
        this.mailService = mailService;
    }
    async registerStudent(studentData) {
        try {
            const tempPassword = Math.random().toString(36).slice(-8);
            const isStudentExists = await this.usersService.findOneByEmail(studentData.email);
            if (isStudentExists) {
                throw new common_1.ConflictException('Email already registered');
            }
            const user = await this.usersService.create({
                email: studentData.email,
                password: tempPassword,
                role: user_entity_1.UserRole.STUDENT,
            });
            let schoolClass = await this.classRepository.findOne({ where: { name: studentData.className } });
            if (!schoolClass) {
                schoolClass = await this.classRepository.save({ name: studentData.className });
            }
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
            await this.mailService.sendCredentials(studentData.email, studentData.name, tempPassword, 'Student');
            return savedStudent;
        }
        catch (error) {
            if (error instanceof common_1.ConflictException)
                throw error;
            throw new Error('Internal registration error: ' + error.message);
        }
    }
    async updateStudent(id, studentData) {
        const student = await this.studentRepository.findOne({
            where: { id },
            relations: ['user', 'schoolClass']
        });
        if (!student)
            throw new common_1.NotFoundException('Student not found');
        if (studentData.name)
            student.fullName = studentData.name;
        if (studentData.section)
            student.section = studentData.section;
        if (studentData.dob)
            student.dob = studentData.dob;
        if (studentData.gender)
            student.gender = studentData.gender;
        if (studentData.fatherName)
            student.fatherName = studentData.fatherName;
        if (studentData.motherName)
            student.motherName = studentData.motherName;
        if (studentData.aadharId)
            student.aadharId = studentData.aadharId;
        if (studentData.bloodGroup)
            student.bloodGroup = studentData.bloodGroup;
        if (studentData.admissionDate)
            student.admissionDate = studentData.admissionDate;
        if (studentData.contactNo)
            student.contactNo = studentData.contactNo;
        if (studentData.address)
            student.address = studentData.address;
        if (studentData.className) {
            let schoolClass = await this.classRepository.findOne({ where: { name: studentData.className } });
            if (!schoolClass) {
                schoolClass = await this.classRepository.save({ name: studentData.className });
            }
            student.schoolClass = schoolClass;
        }
        return this.studentRepository.save(student);
    }
    async registerTeacher(teacherData) {
        const tempPassword = Math.random().toString(36).slice(-8);
        const isTeacherExists = await this.usersService.findOneByEmail(teacherData.email);
        if (isTeacherExists) {
            throw new Error('Email already registered');
        }
        const user = await this.usersService.create({
            email: teacherData.email,
            password: tempPassword,
            role: user_entity_1.UserRole.TEACHER,
        });
        const teacher = this.teacherRepository.create({
            fullName: teacherData.name,
            subject: teacherData.subject,
            salary: teacherData.salary,
            joiningDate: new Date().toISOString().split('T')[0],
            user: user,
        });
        const savedTeacher = await this.teacherRepository.save(teacher);
        await this.mailService.sendCredentials(teacherData.email, teacherData.name, tempPassword, 'Teacher');
        return savedTeacher;
    }
    async getDashboardStats() {
        const totalStudents = await this.studentRepository.count();
        const totalTeachers = await this.teacherRepository.count();
        const feesResult = await this.feePaymentRepository
            .createQueryBuilder('payment')
            .select('SUM(payment.amount)', 'total')
            .getRawOne();
        const students = (await this.studentRepository.find({
            relations: ['schoolClass', 'user'],
            order: { createdAt: 'DESC' }
        })).map(s => ({
            ...s,
            name: s.fullName,
            email: s.user?.email,
            className: s.schoolClass?.name || 'Unassigned',
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
            pendingFees: 450000,
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
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __param(2, (0, typeorm_1.InjectRepository)(fee_payment_entity_1.FeePayment)),
    __param(3, (0, typeorm_1.InjectRepository)(school_class_entity_1.SchoolClass)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService,
        mail_service_1.MailService])
], AdminService);
//# sourceMappingURL=admin.service.js.map