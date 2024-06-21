import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-form',
  standalone: true,
  templateUrl: './student-form.component.html',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
})
export class StudentFormComponent implements OnInit {
  @Input() student: any = {};
  @Output() studentSaved = new EventEmitter<void>();

  studentForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private http: HttpClient) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.student) {
      this.studentForm.patchValue(this.student);
    }
  }

  onSave() {
    if (this.studentForm.valid) {
      if (this.student.id) {
        this.http.put(`http://localhost:3000/students/${this.student.id}`, this.studentForm.value).subscribe(
          () => {
            Swal.fire('Success', 'Student updated successfully', 'success');
            this.studentSaved.emit();
            this.activeModal.close();
          },
          error => Swal.fire('Error', 'Could not update student', 'error')
        );
      } else {
        this.http.post('http://localhost:3000/students', this.studentForm.value).subscribe(
          () => {
            Swal.fire('Success', 'Student added successfully', 'success');
            this.studentSaved.emit();
            this.activeModal.close();
          },
          error => Swal.fire('Error', 'Could not add student', 'error')
        );
      }
    }
  }
}
