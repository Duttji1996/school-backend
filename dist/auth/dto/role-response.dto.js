"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentResponseDto = exports.TeacherResponseDto = exports.AdminResponseDto = exports.UserResponseDto = void 0;
class UserResponseDto {
    id;
    email;
    role;
    fullName;
}
exports.UserResponseDto = UserResponseDto;
class AdminResponseDto extends UserResponseDto {
    permissions;
}
exports.AdminResponseDto = AdminResponseDto;
class TeacherResponseDto extends UserResponseDto {
    subject;
    salary;
    attendancePercentage;
}
exports.TeacherResponseDto = TeacherResponseDto;
class StudentResponseDto extends UserResponseDto {
    className;
    section;
    rollNumber;
}
exports.StudentResponseDto = StudentResponseDto;
//# sourceMappingURL=role-response.dto.js.map