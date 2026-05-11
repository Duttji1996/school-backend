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
    async getStudentDashboard(userId) {
        const student = await this.studentRepository.findOne({
            where: { user: { id: userId } },
            relations: ['user', 'schoolClass'],
        });
        if (!student) {
            throw new common_1.NotFoundException('Student profile not found');
        }
        return {
            studentName: student.fullName,
            studentId: student.id,
            rollNumber: student.rollNumber,
            className: student.schoolClass?.name || 'Unassigned',
            section: student.section,
            attendance: 95,
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
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StudentsService);
//# sourceMappingURL=students.service.js.map