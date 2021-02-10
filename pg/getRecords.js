require("dotenv").config();
const { knex } = require("./knex.js");

const pgGetRecords = (req, res) => {
  const { type, payload } = req.body;
  knex("TABLE_NAME")
    .select("*")
    .then((result) => {
      console.log("Result", result);
      res.send(result.data);
    })
    .catch((err) => {
      res.send(err.message);
    });
};

module.exports = {
  pgGetRecords,
};
