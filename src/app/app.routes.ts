import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'zaposlenici', component: EmployeeListComponent },
  { path: 'dodaj-zaposlenika', component: EmployeeFormComponent },
  { path: '', redirectTo: 'zaposlenici', pathMatch: 'full' },
];
