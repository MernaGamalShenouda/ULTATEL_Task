import { IsEmail, IsNotEmpty, IsDateString, IsEnum } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsEnum(['Male', 'Female'], { message: 'Gender must be either Male or Female' })
  @IsNotEmpty({ message: 'Gender is required' })
  gender: string;

  @IsDateString({}, { message: 'Birthdate must be a valid date' })
  @IsNotEmpty({ message: 'Birthdate is required' })
  birthdate: string;

  @IsNotEmpty({ message: 'Country is required' })
  country: string;
}
