import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { CreateAttendanceDto } from './dto/attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    return await this.attendanceRepository.save(createAttendanceDto);
  }

  async findByUser(userId: string): Promise<Attendance[]> {
    return await this.attendanceRepository.find({
      where: { user: { id: userId } },
      order: { date: 'DESC' },
    });
  }
}
