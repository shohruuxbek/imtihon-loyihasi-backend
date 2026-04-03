import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAttendanceDto {
  @IsNumber()
  studentId: number;

  @IsNumber()
  courseId: number;

  @IsString()
  @IsOptional()
  status?: string = 'present';

  @IsString()
  @IsOptional()
  notes?: string;
}
