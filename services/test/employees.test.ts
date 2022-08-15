import { beforeEach, describe, expect, it } from "vitest";
import DB from "../../data/database";
const testData = require("../../data/organization-tree.json");

describe("employee suite", () => {

  let db;

  beforeEach(async () => {
    db = new DB(testData);
  });

  it("should load test data", () => {
    expect(testData.length).toBe(19);
  });

  it("addEmployee should increment db size by 1", () => {
    var countBefore = db.getEmployees().length;
    db.addEmployee({"employeeId": db.getMaxEmployeeId() + 1, "name": "Test Employee"});
    expect(db.getEmployees()).toHaveLength(countBefore + 1);
  });

  it("getEmployee should return single", () => {
    expect(db.getEmployee(1)).toBeTruthy();
  });

  it("getEmployees should have length 19", () => {
    expect(db.getEmployees()).toHaveLength(19);
  });

  it("getMaxEmployeeId should equal 19", () => {
    expect(db.getMaxEmployeeId()).toEqual(19);
  });

  it("removeEmployee should decrement db size by 1", () => {
    var countBefore = db.getEmployees().length;
    db.removeEmployee(1);
    expect(db.getEmployees()).toHaveLength(countBefore - 1);
  });

  it("updateEmployee should change the record", () => {
    var employeeBefore = db.getEmployee(1);
    var updatedEmployee = employeeBefore;
    updatedEmployee.name = "Updated Name";
    db.updateEmployee(updatedEmployee);
    expect(db.getEmployees(1)).not.toEqual(employeeBefore);
  });
});