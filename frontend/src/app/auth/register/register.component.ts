import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthLayoutComponent } from '../../shared/auth-layout/auth-layout.component';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [FormsModule, HttpClientModule, RouterModule, CommonModule, AuthLayoutComponent],
  providers: [AuthService],
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  fullName = '';
  passwordVisible = false;
  passwordStrengthMessage = '';
  passwordStrengthColor = '';

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    if (this.password !== this.confirmPassword) {
      Swal.fire('Registration Failed', 'Passwords do not match', 'error');
      return;
    }

    const { message, colorClass } = this.checkPasswordStrength(this.password);

    this.authService.register(this.email, this.password, this.fullName).subscribe(
      response => {
        Swal.fire('Registration Successful', 'You have successfully registered', 'success');
        this.router.navigate(['/login']);
      },
      error => {
        Swal.fire('Registration Failed', 'Please try again', 'error');
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  private checkPasswordStrength(password: string): { message: string | null, colorClass: string } {
    let message = null;
    let colorClass = '';

    if (password.length < 8) {
      message = 'Password must be at least 8 characters long';
      colorClass = 'text-danger';
    } else if (!/(?=.*\d)/.test(password)) {
      message = 'Password must contain at least 1 digit';
      colorClass = 'text-warning';
    } else if (!/(?=.*[a-z])/.test(password)) {
      message = 'Password must contain at least 1 lowercase letter';
      colorClass = 'text-warning';
    } else if (!/(?=.*[A-Z])/.test(password)) {
      message = 'Password must contain at least 1 uppercase letter';
      colorClass = 'text-warning';
    } else if (!/(?=.*\W)/.test(password)) {
      message = 'Password must contain at least 1 special character';
      colorClass = 'text-info';
    } else {
      message = 'Password meets all criteria';
      colorClass = 'text-success';
    }

    this.passwordStrengthMessage = message;
    this.passwordStrengthColor = colorClass;
    return { message, colorClass };
  }
}
