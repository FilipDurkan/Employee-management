import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    DatePipe,
    NgxPaginationModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  sortDirection = true; // True for ascending, false for descending
  activeSortField: keyof Employee | '' = '';
  p: number = 1;
  itemsPerPage: number = 5;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data.data;
      this.filteredEmployees = data.data;
    });
  }
  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredEmployees = this.employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(searchTerm) ||
        employee.lastName.toLowerCase().includes(searchTerm)
    );
    this.p = 1;
  }
  onFilter(event: any) {
    const filterValue = event.target.value;
    if (filterValue) {
      this.filteredEmployees = this.employees.filter(
        (employee) => employee.jobTitle === filterValue
      );
      this.p = 1;
    } else {
      this.filteredEmployees = this.employees;
      this.p = 1;
    }
  }
  sortBy(key: keyof Employee) {
    if (this.activeSortField === key) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.activeSortField = key;
      this.sortDirection = true;
    }
    const direction = this.sortDirection ? 1 : -1;
    this.filteredEmployees.sort((a, b) => {
      if (a[key] < b[key]) return -1 * direction;
      if (a[key] > b[key]) return 1 * direction;
      return 0;
    });
  }
}
