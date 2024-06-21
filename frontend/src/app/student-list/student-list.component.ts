import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentFormComponent } from '../student-form/student-form.component';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthdate: string;
  country: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-student-list',
  standalone: true,
  templateUrl: './student-list.component.html',
  imports: [CommonModule, HttpClientModule, FormsModule, NgxPaginationModule, NgbModalModule],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  searchName = '';
  searchGender = '';
  searchCountry = '';
  searchAgeFrom = '';
  searchAgeTo = '';
  page = 1;
  itemsPerPage = 10;


  constructor(private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.http.get<Student[]>('http://localhost:3000/students').subscribe(
      (data: Student[]) => this.students = data,
      error => Swal.fire('Error', 'Could not load students', 'error')
    );
  }

  onSearch() {
    const params = new HttpParams()
      .set('name', this.searchName)
      .set('gender', this.searchGender)
      .set('country', this.searchCountry)
      .set('ageFrom', this.searchAgeFrom)
      .set('ageTo', this.searchAgeTo);

    this.http.get<Student[]>('http://localhost:3000/students', { params }).subscribe(
      (data: Student[]) => this.students = data,
      error => Swal.fire('Error', 'Could not search students', 'error')
    );
  }

  onReset() {
    this.searchName = '';
    this.searchGender = '';
    this.searchCountry = '';
    this.searchAgeFrom = '';
    this.searchAgeTo = '';
    this.loadStudents();
  }

  onDelete(student: Student) {
    this.http.delete(`http://localhost:3000/students/${student.id}`).subscribe(
      () => {
        Swal.fire('Deleted', 'Student has been deleted', 'success');
        this.loadStudents();
      },
      error => Swal.fire('Error', 'Could not delete student', 'error')
    );
  }

  onShowMore(student: Student) {
    Swal.fire({
      title: `${student.firstName} ${student.lastName}`,
      html: `
        <p>Email: ${student.email}</p>
        <p>Gender: ${student.gender}</p>
        <p>Birthdate: ${student.birthdate}</p>
        <p>Country: ${student.country}</p>
        <p>Created By: ${student.createdBy}</p>
        <p>Updated By: ${student.updatedBy}</p>
        <p>Created At: ${student.createdAt}</p>
        <p>Updated At: ${student.updatedAt}</p>
      `,
      icon: 'info'
    });
  }

  openAddStudentModal() {
    const modalRef = this.modalService.open(StudentFormComponent);
    modalRef.componentInstance.studentSaved.subscribe(() => {
      this.loadStudents(); 
    });
  }

  openEditStudentModal(student: Student) {
    const modalRef = this.modalService.open(StudentFormComponent);
    modalRef.componentInstance.student = student;
    modalRef.componentInstance.studentSaved.subscribe(() => {
      this.loadStudents(); 
    });
  }
}
