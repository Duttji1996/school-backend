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
    forgotPassword(email: string): Promise<{
        success: boolean;
        message: string;
    }>;
    resendOTP(email: string): Promise<{
        success: boolean;
        message: string;
    }>;
    verifyOTP(email: string, otp: string): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(email: string, otp: string, newPass: string): Promise<{
        success: boolean;
        message: string;
    }>;
    changePassword(userId: string, oldPass: string, newPass: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
