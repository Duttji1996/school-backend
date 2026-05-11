import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/attendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    create(createAttendanceDto: CreateAttendanceDto): Promise<import("./attendance.entity").Attendance>;
    findByUser(userId: string): Promise<import("./attendance.entity").Attendance[]>;
}
