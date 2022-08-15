import { JSONPath } from "jsonpath-plus";
import { arrayToTree } from "performant-array-to-tree";
import Database from "../models/database";
import Employee from "../models/employee";
import Record from "../models/record";
var _ = require('lodash');

export default class DB implements Database {
    _db = new Array<Employee>();

    constructor(seedData: Array<Employee> = []) {
        this._db = seedData;
    }
    
    public addEmployee(employee: Record): void {
        throw new Error("Not yet implemented");
    }

    public getEmployee(employeeId: number, includeReporting: boolean = false): Employee {
        return includeReporting
            ? JSONPath({path: `$..[?(@.employeeId==${employeeId})]`, json: arrayToTree(this._db, {
                "id": "employeeId",
                "parentId": "managerId",
                "childrenField": "directReports",
                "dataField": null
            })})
            : this.getEmployeeWithManager(employeeId);
    }

    public getEmployees(): Array<Employee> {
        return _.map(this._db, (e: Record) => this.getEmployeeWithManager(e.employeeId))
    }

    public getMaxEmployeeId(): number {
        return _.maxBy(this._db, (e: Record) => e.employeeId).employeeId;
    }

    public removeEmployee(employeeId: number): void {
        throw new Error("Not yet implemented");
    }

    public updateEmployee(employee: Employee): void {
        throw new Error("Not yet implemented");
    }

    private getEmployeeWithManager(employeeId: number): Employee {
        var employee = _.find(this._db, (e: Record) => e.employeeId === employeeId);
        return {
            employeeId: employee.employeeId,
            name: employee.name,
            ...(employee.managerId && { "manager": this.getEmployeeWithManager(employee.managerId) })
        };
    }
}