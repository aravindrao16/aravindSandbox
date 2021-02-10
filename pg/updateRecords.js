require("dotenv").config();
const { knex } = require("./knex.js");

const pgUpdateRecords = (req, res) => {
  const { type, payload } = req.body;
  knex("TABLE_NAME")
    .update(payload)
    .where("ID", payload.ID)
    .then((result) => {
      console.log("Result", result);
      res.send("Success");
    })
    .catch((err) => {
      res.send(err.message);
    });
};

module.exports = {
  pgUpdateRecords,
};
