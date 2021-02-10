require("dotenv").config();
const { knex } = require("./knex.js");

const usageDetails = (req, res) => {
  const { type, payload } = req.body;
  const browser = req.header["user-agent"];
  const ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  payload.CLIENT_BROWSER = browser;
  payload.CLIENT_IP = ip;
  knex("TABLE_NAME")
    .insert(payload)
    .then((result) => {
      res.send("Success");
    })
    .catch((err) => {
      res.send(err.message);
    });
};

module.exports = {
  usageDetails,
};
