import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  getDashboard() {
    return this.adminService.getDashboardStats();
  }

  @Post('teachers')
  registerTeacher(@Body() teacherData: any) {
    try {
      return this.adminService.registerTeacher(teacherData);
    } catch (error) {
      console.error('Error registering teacher:', error);
      throw error;
    }
  }

  @Post('students')
  registerStudent(@Body() studentData: any) {
    return this.adminService.registerStudent(studentData);
  }

  @Put('students/:id')
  updateStudent(@Param('id') id: string, @Body() studentData: any) {
    return this.adminService.updateStudent(id, studentData);
  }
}
