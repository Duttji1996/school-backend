import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendEnrollmentApproval(email: string, name: string): Promise<void>;
    sendHomeworkNotification(email: string, studentName: string, subject: string, title: string): Promise<void>;
    sendSalaryCreditNotification(email: string, teacherName: string, amount: number): Promise<void>;
    sendCredentials(email: string, name: string, password: string, role: string): Promise<void>;
}
