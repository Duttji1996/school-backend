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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("./entities/student.entity");
let StudentsService = class StudentsService {
    studentRepository;
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    async create(studentData) {
        const student = this.studentRepository.create(studentData);
        return this.studentRepository.save(student);
    }
    async getStudentDashboard(userId) {
        const student = await this.studentRepository.findOne({
            where: { user: { id: userId } },
            relations: ['user', 'schoolClass'],
        });
        if (!student) {
            throw new common_1.NotFoundException('Student profile not found');
        }
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
            attendanceDetails: [],
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
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StudentsService);
//# sourceMappingURL=students.service.js.map