import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { CreateAttendanceDto } from './dto/attendance.dto';
export declare class AttendanceService {
    private attendanceRepository;
    constructor(attendanceRepository: Repository<Attendance>);
    create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance>;
    findByUser(userId: string): Promise<Attendance[]>;
}
