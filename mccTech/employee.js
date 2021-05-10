const axios = require("axios");
const url = "http://dummy.restapiexample.com/api/v1/employee/1";

const getEmployeeData = (req, res) => {
  axios
    .get(`${url}`)
    .then((result) => {
      console.log("Result Node", result);
      res.send(result.data);
    })
    .catch((err) => {
      res.send("Failed", err.message);
    });
};

module.exports = {
  getEmployeeData,
};
