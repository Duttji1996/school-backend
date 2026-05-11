import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Student } from '../students/entities/student.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { FeePayment } from '../finance/entities/fee-payment.entity';
import { SchoolClass } from '../curriculum/entities/school-class.entity';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Teacher, FeePayment, SchoolClass]),
    UsersModule,
    MailModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
