import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEnrollmentApproval(email: string, name: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Enrollment Approved - UDCS Portal',
      template: './approval', // You can create templates later
      context: { name },
      html: `<h3>Hello ${name},</h3><p>Your enrollment at Usha Devi Convent School has been approved. You can now login to the portal.</p>`,
    });
  }

  async sendHomeworkNotification(email: string, studentName: string, subject: string, title: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: `New Homework Assigned: ${subject}`,
      html: `<h3>Dear ${studentName},</h3><p>A new homework has been assigned for <b>${subject}</b>: <i>${title}</i>. Please check your portal for details.</p>`,
    });
  }

  async sendSalaryCreditNotification(email: string, teacherName: string, amount: number) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Salary Credited - UDCS Staff Portal',
      html: `<h3>Hello ${teacherName},</h3><p>Your salary of ₹${amount} has been successfully credited to your account. Thank you for your hard work!</p>`,
    });
  }

  async sendCredentials(email: string, name: string, password: string, role: string) {
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
}
