export declare class UserResponseDto {
    id: string;
    email: string;
    role: string;
    fullName: string;
}
export declare class AdminResponseDto extends UserResponseDto {
    permissions: string[];
}
export declare class TeacherResponseDto extends UserResponseDto {
    subject: string;
    salary: number;
    attendancePercentage: number;
}
export declare class StudentResponseDto extends UserResponseDto {
    className: string;
    section: string;
    rollNumber: string;
}
