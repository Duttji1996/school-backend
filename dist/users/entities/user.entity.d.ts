export declare enum UserRole {
    ADMIN = "admin",
    TEACHER = "teacher",
    STUDENT = "student"
}
export declare class User {
    id: string;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
    resetPasswordOTP: string | null;
    otpExpiry: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
