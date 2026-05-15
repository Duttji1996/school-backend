import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private readonly mailerService;
    private readonly configService;
    constructor(mailerService: MailerService, configService: ConfigService);
    sendContactFormNotification(details: {
        name: string;
        email: string;
        phone?: string;
        subject: string;
        message: string;
    }): Promise<void>;
    sendSignupNotification(email: string, name: string): Promise<void>;
    sendEnrollmentApproval(email: string, name: string): Promise<void>;
    sendHomeworkNotification(email: string, studentName: string, subject: string, title: string): Promise<void>;
    sendSalaryCreditNotification(email: string, teacherName: string, amount: number): Promise<void>;
    sendCredentials(email: string, name: string, password: string, role: string): Promise<void>;
    sendPasswordResetOTP(email: string, otp: string): Promise<void>;
}
