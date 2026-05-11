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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let MailService = class MailService {
    mailerService;
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendEnrollmentApproval(email, name) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Enrollment Approved - UDCS Portal',
            template: './approval',
            context: { name },
            html: `<h3>Hello ${name},</h3><p>Your enrollment at Usha Devi Convent School has been approved. You can now login to the portal.</p>`,
        });
    }
    async sendHomeworkNotification(email, studentName, subject, title) {
        await this.mailerService.sendMail({
            to: email,
            subject: `New Homework Assigned: ${subject}`,
            html: `<h3>Dear ${studentName},</h3><p>A new homework has been assigned for <b>${subject}</b>: <i>${title}</i>. Please check your portal for details.</p>`,
        });
    }
    async sendSalaryCreditNotification(email, teacherName, amount) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Salary Credited - UDCS Staff Portal',
            html: `<h3>Hello ${teacherName},</h3><p>Your salary of ₹${amount} has been successfully credited to your account. Thank you for your hard work!</p>`,
        });
    }
    async sendCredentials(email, name, password, role) {
        await this.mailerService.sendMail({
            to: email,
            subject: `Welcome to UDCS - Your ${role} Portal Access`,
            html: `
        <h3>Welcome to Usha Devi Convent School, ${name}!</h3>
        <p>Your ${role} account has been successfully created. You can now access the portal using the following credentials:</p>
        <p><b>Login URL:</b> http://localhost:4200/portal</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Temporary Password:</b> ${password}</p>
        <p>Please change your password after your first login.</p>
        <br>
        <p>Regards,<br>UDCS Administration</p>
      `,
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map