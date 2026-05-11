import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { StudentsService } from '../students/students.service';
import { MailService } from '../mail/mail.service';
import { UserRole } from '../users/entities/user.entity';
export declare class AuthService {
    private usersService;
    private studentsService;
    private jwtService;
    private mailService;
    constructor(usersService: UsersService, studentsService: StudentsService, jwtService: JwtService, mailService: MailService);
    signup(signupDto: any): Promise<{
        success: boolean;
        message: string;
    }>;
    login(email: string, pass: string): Promise<{
        success: boolean;
        access_token: string;
        token: string;
        userId: string;
        role: UserRole;
        message: string;
    }>;
}
