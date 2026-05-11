import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: any): Promise<{
        success: boolean;
        access_token: string;
        token: string;
        userId: string;
        role: import("../users/entities/user.entity").UserRole;
        message: string;
    }>;
    signup(signupDto: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
