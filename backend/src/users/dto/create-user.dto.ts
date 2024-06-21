import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least 1 digit' })
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least 1 lowercase letter' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least 1 uppercase letter' })
  @Matches(/(?=.*\W)/, { message: 'Password must contain at least 1 special character' })
  password: string;

  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;
}
