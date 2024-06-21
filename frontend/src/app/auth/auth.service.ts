import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponseData {
  email: string;
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  register(email: string, password: string, fullName: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.baseUrl}/users/register`, { email, password, fullName });
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.baseUrl}/auth/login`, { email, password }).pipe(
      tap(response => {
        console.log(response.access_token); 
        localStorage.setItem('token', response.access_token); 
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
