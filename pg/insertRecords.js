require("dotenv").config();
const { knex } = require("./knex.js");

const pgInsertRecords = (req, res) => {
  const { type, payload } = req.body;
  knex("TABLE_NAME")
    .insert(payload)
    .returning("ID")
    .then((result) => {
      console.log("Result", result);
      res.send("Success");
    })
    .catch((err) => {
      res.send(err.message);
    });
};

module.exports = {
  pgInsertRecords,
};
