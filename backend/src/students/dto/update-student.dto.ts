import { IsOptional, IsEmail, IsNotEmpty, IsDateString, IsEnum } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsNotEmpty({ message: 'First name is required' })
  firstName?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email?: string;

  @IsOptional()
  @IsEnum(['Male', 'Female'], { message: 'Gender must be either Male or Female' })
  @IsNotEmpty({ message: 'Gender is required' })
  gender?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Birthdate must be a valid date' })
  @IsNotEmpty({ message: 'Birthdate is required' })
  birthdate?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Country is required' })
  country?: string;
}
