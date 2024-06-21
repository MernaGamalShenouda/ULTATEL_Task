import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthLayoutComponent } from '../../shared/auth-layout/auth-layout.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule, HttpClientModule, RouterModule, CommonModule, AuthLayoutComponent],
  providers: [AuthService],
})
export class LoginComponent {
  email = '';
  password = '';
  passwordVisible = false;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        Swal.fire('Login Successful', 'You have successfully logged in', 'success');
        this.router.navigate(['/students']);
      },
      error => {
        Swal.fire('Login Failed', 'Invalid email or password', 'error');
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
