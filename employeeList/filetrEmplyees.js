const axios = require("axios");

const employeeArray = [
  {
    name: "abc",
    salary: 50000,
  },
  {
    name: "abc1",
    salary: 55000,
  },
  {
    name: "abc2",
    salary: 56000,
  },
  {
    name: "abc3",
    salary: 45000,
  },
  {
    name: "abc4",
    salary: 46000,
  },
];

const filetrEmployeeBasedOnSalery = (req, res) => {
  var employeeList = employeeArray.filter(
    (employee) => employee.salary > 50000
  );
  console.log("Result", employeeList);
  return employeeList;
};

module.exports = {
  filetrEmployeeBasedOnSalery,
};
