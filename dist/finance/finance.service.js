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
exports.FinanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fee_payment_entity_1 = require("./entities/fee-payment.entity");
const salary_payment_entity_1 = require("./entities/salary-payment.entity");
let FinanceService = class FinanceService {
    feePaymentRepository;
    salaryPaymentRepository;
    constructor(feePaymentRepository, salaryPaymentRepository) {
        this.feePaymentRepository = feePaymentRepository;
        this.salaryPaymentRepository = salaryPaymentRepository;
    }
    async payFees(paymentData) {
        return await this.feePaymentRepository.save(paymentData);
    }
    async creditSalary(salaryData) {
        return await this.salaryPaymentRepository.save(salaryData);
    }
    async getStudentFees(studentId) {
        return await this.feePaymentRepository.find({
            where: { student: { id: studentId } },
            order: { paymentDate: 'DESC' },
        });
    }
};
exports.FinanceService = FinanceService;
exports.FinanceService = FinanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(fee_payment_entity_1.FeePayment)),
    __param(1, (0, typeorm_1.InjectRepository)(salary_payment_entity_1.SalaryPayment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FinanceService);
//# sourceMappingURL=finance.service.js.map