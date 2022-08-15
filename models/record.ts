import Ajv from "ajv";

const ajv = new Ajv();

export default interface Record {
    employeeId: number;
    name: string;
    managerId?: number;
}

const schema = {
    type: "object",
    properties: {
        employeeId: {type: "integer"},
        name: {type: "string"},
        managerId: {type: "integer"},
    },
    required: ["name"],
    additionalProperties: false,    
}

export function IsRecord(record: any): record is Record {
    const validate = ajv.compile(schema);
    return validate(record);
}