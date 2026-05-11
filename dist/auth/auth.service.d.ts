import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(email: string, pass: string): Promise<{
        success: boolean;
        access_token: string;
        token: string;
        userId: string;
        role: import("../users/entities/user.entity").UserRole;
        message: string;
    }>;
}
