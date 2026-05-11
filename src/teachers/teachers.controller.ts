import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TeachersService } from './teachers.service';

@Controller('teacher')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('dashboard/:userId')
  async getDashboard(@Param('userId') userId: string) {
    return this.teachersService.getTeacherDashboard(userId);
  }
}
