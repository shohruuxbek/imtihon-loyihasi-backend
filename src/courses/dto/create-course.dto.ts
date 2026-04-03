import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  status?: string = 'active';

  @IsNumber()
  @IsOptional()
  teacherId?: number;

  @IsString()
  @IsOptional()
  schedule?: string;
}
