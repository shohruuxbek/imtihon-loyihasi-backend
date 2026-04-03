import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  groupId: number;

  @IsNumber()
  courseId: number;

  @IsString()
  @IsNotEmpty()
  courseName: string;

  @IsString()
  @IsOptional()
  status?: string = 'active';

  @IsString()
  @IsOptional()
  enrolledDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
