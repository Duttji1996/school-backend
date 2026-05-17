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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const students_service_1 = require("../students/students.service");
const mail_service_1 = require("../mail/mail.service");
const user_entity_1 = require("../users/entities/user.entity");
let AuthService = class AuthService {
    usersService;
    studentsService;
    jwtService;
    mailService;
    constructor(usersService, studentsService, jwtService, mailService) {
        this.usersService = usersService;
        this.studentsService = studentsService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async signup(signupDto) {
        const existingUser = await this.usersService.findOneByEmail(signupDto.email);
        if (existingUser) {
            throw new common_1.ConflictException('Email already registered');
        }
        const user = await this.usersService.create({
            email: signupDto.email,
            password: signupDto.password,
            role: user_entity_1.UserRole.STUDENT,
            isActive: true,
        });
        await this.studentsService.create({
            fullName: signupDto.fullName,
            user: user,
            status: 'pending',
            section: 'A',
        });
        void this.mailService.sendSignupNotification(signupDto.email, signupDto.fullName);
        return {
            success: true,
            message: 'Registration successful. Please wait for admin approval.',
        };
    }
    async login(email, pass) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid user');
        }
        if (user && user.password !== pass) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            success: true,
            access_token: this.jwtService.sign(payload),
            token: this.jwtService.sign(payload),
            userId: user.id,
            role: user.role,
            message: 'Login successful'
        };
    }
    async forgotPassword(email) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('No account found with this email');
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 10);
        user.resetPasswordOTP = otp;
        user.otpExpiry = expiry;
        await this.usersService.save(user);
        void this.mailService.sendPasswordResetOTP(email, otp);
        return { success: true, message: 'OTP sent to your email' };
    }
    async resendOTP(email) {
        return this.forgotPassword(email);
    }
    async verifyOTP(email, otp) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user || user.resetPasswordOTP !== otp) {
            throw new common_1.UnauthorizedException('Invalid OTP');
        }
        if (!user.otpExpiry || new Date() > user.otpExpiry) {
            throw new common_1.UnauthorizedException('OTP has expired');
        }
        return { success: true, message: 'OTP verified successfully' };
    }
    async resetPassword(email, otp, newPass) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user || user.resetPasswordOTP !== otp) {
            throw new common_1.UnauthorizedException('Invalid OTP or Session');
        }
        user.password = newPass;
        user.resetPasswordOTP = null;
        user.otpExpiry = null;
        await this.usersService.save(user);
        return { success: true, message: 'Password reset successful' };
    }
    async changePassword(userId, oldPass, newPass) {
        const user = await this.usersService.findOneById(userId);
        if (!user || user.password !== oldPass) {
            throw new common_1.UnauthorizedException('Incorrect old password');
        }
        user.password = newPass;
        await this.usersService.save(user);
        return { success: true, message: 'Password changed successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        students_service_1.StudentsService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map