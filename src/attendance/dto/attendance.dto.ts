import { IsDateString, IsEnum, IsUUID, IsOptional, IsString } from 'class-validator';

export class CreateAttendanceDto {
  @IsUUID()
  userId: string;

  @IsDateString()
  date: string;

  @IsEnum(['present', 'absent', 'holiday', 'sunday'])
  status: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}

export class UpdateAttendanceDto {
  @IsEnum(['present', 'absent', 'holiday', 'sunday'])
  status: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}
