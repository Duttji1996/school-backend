import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendContactFormNotification(details: { name: string; email: string; subject: string; message: string }) {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL') || 'prakashdutttripathi@gmail.com';

    // Send to Admin
    await this.mailerService.sendMail({
      to: adminEmail,
      subject: `New Contact Form Submission: ${details.subject}`,
      html: `
        <h3>New Message from Contact Form</h3>
        <p><b>Name:</b> ${details.name}</p>
        <p><b>Email:</b> ${details.email}</p>
        <p><b>Subject:</b> ${details.subject}</p>
        <p><b>Message:</b></p>
        <p>${details.message}</p>
      `,
    });

    // Send Confirmation to User
    await this.mailerService.sendMail({
      to: details.email,
      subject: 'We received your message - UDCS',
      html: `
        <h3>Hello ${details.name},</h3>
        <p>Thank you for reaching out to Usha Devi Convent School. We have received your message regarding "<b>${details.subject}</b>".</p>
        <p>Our team will get back to you within 24 hours.</p>
        <br>
        <p>Regards,<br>UDCS Administration</p>
      `,
    });
  }

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
