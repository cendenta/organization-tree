import Employee from "./employee";

export default interface Database {
    _db: Array<Employee>;
    addEmployee(employee: Employee): void;
    getEmployee(employeeId: number): Employee;
    getEmployees(): Array<Employee>;
    removeEmployee(employeeId: number): void;
    updateEmployee (employee: Employee): void;
}