import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

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
