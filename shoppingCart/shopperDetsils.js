let getTaxes = "http://techchallenge/api/tax/rates";

let getExceptions = "http://techchallenge/api/tax/exemptions";
const axios = require("axios");

const getTaxRates = (req, res) => {
  const { type, payload } = req.body;
  let url = "";
  if (type === "taxRates") {
    url = getTaxes;
  } else if (type === "taxExceptions") {
    url = getExceptions;
  }
  axios
    .get(url)
    .then((result) => {
      console.log("Result", result);
      res.send(result.data);
    })
    .catch((err) => {
      res.send(err.message);
    });
};

module.exports = {
  getTaxRates,
};
