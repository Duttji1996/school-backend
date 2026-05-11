import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StudentsService } from './students.service';

@Controller('student') // Singular 'student' as seen in the frontend 404 error
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('dashboard/:userId')
  async getDashboard(@Param('userId') userId: string) {
    return this.studentsService.getStudentDashboard(userId);
  }
}
