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
}
