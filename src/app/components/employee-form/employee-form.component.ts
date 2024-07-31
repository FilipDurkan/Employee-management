import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent {
  employeeForm: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      jobTitle: ['', Validators.required],
    });
  }
  onSave() {
    if (this.employeeForm.valid) {
      this.isSubmitted = true;
      const newEmployee: Employee = {
        id: uuidv4(),
        firstName: this.employeeForm.value.firstName,
        lastName: this.employeeForm.value.lastName,
        dateOfBirth: this.employeeForm.value.dateOfBirth,
        jobTitle: this.employeeForm.value.jobTitle,
      };
      console.log(newEmployee);
    } else {
      this.isSubmitted = true;
      console.log('Form is invalid');
    }
  }
}
