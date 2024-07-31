export interface Employee {
  id: number | string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  jobTitle: string;
}
export interface EmployeesData {
  success: boolean;
  data: Employee[];
}
