import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { StudentsService } from '../students/students.service';
import { MailService } from '../mail/mail.service';
import { UserRole } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private studentsService: StudentsService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) { }

  async signup(signupDto: any) {
    const existingUser = await this.usersService.findOneByEmail(signupDto.email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Create user
    const user = await this.usersService.create({
      email: signupDto.email,
      password: signupDto.password, // Ideally hashed, but following current pattern
      role: UserRole.STUDENT,
      isActive: true,
    });

    // Create student record (pending by default)
    await this.studentsService.create({
      fullName: signupDto.fullName,
      user: user,
      status: 'pending',
      section: 'A', // Default section
    });

    // Send email notification
    void this.mailService.sendSignupNotification(signupDto.email, signupDto.fullName);

    return {
      success: true,
      message: 'Registration successful. Please wait for admin approval.',
    };
  }

  async login(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }


    if (user && user.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }


    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      success: true,
      access_token: this.jwtService.sign(payload),
      token: this.jwtService.sign(payload), // For compatibility with frontend
      userId: user.id,
      role: user.role,
      message: 'Login successful'
    };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      // Don't reveal user existence for security, but following simpler pattern
      throw new UnauthorizedException('No account found with this email');
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

  async resendOTP(email: string) {
    return this.forgotPassword(email);
  }

  async verifyOTP(email: string, otp: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user || user.resetPasswordOTP !== otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    if (!user.otpExpiry || new Date() > user.otpExpiry) {
      throw new UnauthorizedException('OTP has expired');
    }

    return { success: true, message: 'OTP verified successfully' };
  }

  async resetPassword(email: string, otp: string, newPass: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user || user.resetPasswordOTP !== otp) {
      throw new UnauthorizedException('Invalid OTP or Session');
    }

    user.password = newPass;
    user.resetPasswordOTP = null;
    user.otpExpiry = null;
    await this.usersService.save(user);

    return { success: true, message: 'Password reset successful' };
  }

  async changePassword(userId: string, oldPass: string, newPass: string) {
    const user = await this.usersService.findOneById(userId);
    if (!user || user.password !== oldPass) {
      throw new UnauthorizedException('Incorrect old password');
    }

    user.password = newPass;
    await this.usersService.save(user);

    return { success: true, message: 'Password changed successfully' };
  }
}
