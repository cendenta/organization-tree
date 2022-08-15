import Ajv from "ajv";

const ajv = new Ajv();

export default interface Employee {
    employeeId: number;
    name: string;
    manager?: Employee;
    status: 'active' | 'inactive';
    directReports: Array<Employee>;
}

const schema = {
    type: "object",
    properties: {
        employeeId: {type: "integer"},
        name: {type: "string"},
        manager: {type: "Employee"},
    },
    required: ["name"],
    additionalProperties: false,    
}

export function IsEmployee(employee: any): employee is Employee {
    const validate = ajv.compile(schema);
    return validate(employee);
}