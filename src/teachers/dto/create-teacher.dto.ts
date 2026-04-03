import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsString()
  specialization: string;

  @IsNumber()
  experience: number;

  @IsString()
  @IsOptional()
  status?: string = 'active';

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  assignedCourses?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
