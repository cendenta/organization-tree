import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import DB from "../../data/database";
var _ = require('lodash');
const initialData = require("../../data/organization-tree.json");
const db = new DB(initialData);

// POST /employees
export const addEmployee: APIGatewayProxyHandlerV2 = async (event) => {
  return {
    statusCode: 501,
    description: "Not yet implemented"
  }
}

// DELETE /employees/{employeeId}
export const deleteEmployee: APIGatewayProxyHandlerV2 = async (event) => {
  return {
    statusCode: 501,
    description: "Not yet implemented"
  }
}

// GET /employees/{employeeId}
export async function getByEmployeeId(event: any) {
  var employeeId = Number(event.pathParameters?.employeeId) || -1;
  if (employeeId < 1) {
    return {
      statusCode: 400,
      description: "Invalid employeeId"
    };
  }

  var employee = db.getEmployee(employeeId, (event.queryStringParameters?.includeReportingTree === 'true') || false);
  if (employee) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: employee
    };
  } else {
    return {
      statusCode: 404,
      description: "Employee not found"
    };
  }
}

// GET /employees
export const getEmployees: APIGatewayProxyHandlerV2 = async (event) => { 
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.parse(JSON.stringify(db.getEmployees())),
  };
}

// PUT /employees/{employeeId}
export const updateEmployee: APIGatewayProxyHandlerV2 = async (event) => { 
  return {
    statusCode: 501,
    description: "Not yet implemented"
  }
}