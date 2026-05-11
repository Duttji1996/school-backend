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

  async sendSignupNotification(email: string, name: string) {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL') || 'prakashdutttripathi@gmail.com';

    // Notify User
    await this.mailerService.sendMail({
      to: email,
      subject: 'Registration Pending - UDCS Student Portal',
      html: `
        <h3>Hello ${name},</h3>
        <p>Your registration for the Usha Devi Convent School student portal has been received successfully.</p>
        <p><b>Status:</b> Pending Administration Approval</p>
        <p>Our team will review your application soon. You will receive another email once your account is activated.</p>
        <br>
        <p>Regards,<br>UDCS Administration</p>
      `,
    });

    // Notify Admin
    await this.mailerService.sendMail({
      to: adminEmail,
      subject: `New Student Registration: ${name}`,
      html: `
        <h3>New Student Signup</h3>
        <p>A new student has registered and is waiting for approval.</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p>Please log in to the admin dashboard to review and approve this registration.</p>
      `,
    });
  }

  async sendEnrollmentApproval(email: string, name: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Account Activated - Welcome to UDCS Portal',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #0c1e33; padding: 30px; text-align: center;">
            <h1 style="color: #fadb5f; margin: 0;">UDCS Portal</h1>
          </div>
          <div style="padding: 40px; color: #1e293b; line-height: 1.6;">
            <h2 style="color: #0c1e33;">Congratulations, ${name}!</h2>
            <p>We are pleased to inform you that your registration for the <b>Usha Devi Convent School</b> student portal has been <b>Approved</b>.</p>
            <p>Your account is now fully active. You can log in to access your student dashboard, view your profile, track attendance, and stay updated with homework and fees.</p>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="http://localhost:4200/portal" style="background: #fadb5f; color: #0c1e33; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 800; font-size: 1.1rem;">Access Your Dashboard</a>
            </div>

            <p style="font-size: 0.9rem; color: #64748b;">If the button above doesn't work, copy and paste this link into your browser:<br>
            <a href="http://localhost:4200/portal" style="color: #4a90e2;">http://localhost:4200/portal</a></p>
            
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;">
            <p>Welcome to the UDCS family!</p>
            <p>Regards,<br><b>Administration Team</b><br>Usha Devi Convent School</p>
          </div>
          <div style="background: #f8fafc; padding: 20px; text-align: center; font-size: 0.8rem; color: #94a3b8;">
            &copy; 2026 Usha Devi Convent School. All rights reserved.
          </div>
        </div>
      `,
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
