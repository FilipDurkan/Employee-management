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
  sortDirection = true;
  activeSortField: keyof Employee | '' = '';
  p: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string = '';
  filterValue: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data.data;
      this.filteredEmployees = data.data;
    });
  }
  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.applyFilters();
  }

  onFilter(event: any) {
    this.filterValue = event.target.value;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredEmployees = this.employees.filter((employee) => {
      const matchesSearch =
        employee.firstName.toLowerCase().includes(this.searchTerm) ||
        employee.lastName.toLowerCase().includes(this.searchTerm);
      const matchesFilter = this.filterValue
        ? employee.jobTitle === this.filterValue
        : true;
      return matchesSearch && matchesFilter;
    });

    this.p = 1;
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
