import { StackContext, Api } from "@serverless-stack/resources";

export function MyStack({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /employees":                 "functions/lambda.getEmployees",
      "GET /employees/{employeeId}":    "functions/lambda.getByEmployeeId",
      "POST /employees":                "functions/lambda.addEmployee",
      "DELETE /employees/{employeeId}": "functions/lambda.deleteEmployee",
      "PUT /employees/{employeeId}":    "functions/lambda.updateEmployee"
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url
  });
}