import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: any) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('signup')
  async signup(@Body() signupDto: any) {
    return this.authService.signup(signupDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('resend-otp')
  async resendOTP(@Body('email') email: string) {
    return this.authService.resendOTP(email);
  }

  @Post('verify-otp')
  async verifyOTP(@Body('email') email: string, @Body('otp') otp: string) {
    return this.authService.verifyOTP(email, otp);
  }

  @Post('reset-password')
  async resetPassword(@Body('email') email: string, @Body('otp') otp: string, @Body('newPassword') newPass: string) {
    return this.authService.resetPassword(email, otp, newPass);
  }

  @Post('change-password')
  async changePassword(@Body('userId') userId: string, @Body('oldPassword') oldPass: string, @Body('newPassword') newPass: string) {
    return this.authService.changePassword(userId, oldPass, newPass);
  }
}
