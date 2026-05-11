export class UserResponseDto {
  id: string;
  email: string;
  role: string;
  fullName: string;
}

export class AdminResponseDto extends UserResponseDto {
  permissions: string[];
}

export class TeacherResponseDto extends UserResponseDto {
  subject: string;
  salary: number;
  attendancePercentage: number;
}

export class StudentResponseDto extends UserResponseDto {
  className: string;
  section: string;
  rollNumber: string;
}
