import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { StudentListComponent } from './student-list/student-list.component';

export const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
      },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    {
        path: 'students', 
        component: StudentListComponent
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' } 
];
