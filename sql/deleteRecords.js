require("dotenv").config();
const { knex } = require("./knex.js");

const sqlDeleteRecords = (req, res) => {
  const { type, payload } = req.body;
  knex("TABLE_NAME")
    .where("ID", payload.ID)
    .del()
    .then((result) => {
      console.log("Result", result);
      res.send("Success");
    })
    .catch((err) => {
      res.send(err.message);
    });
};

module.exports = {
  sqlDeleteRecords,
};
