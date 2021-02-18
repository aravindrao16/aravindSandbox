require("dotenv").config;
require("log-timestamp");

const express = require("express");
const server = express();
const axios = require("axios");
const path = require("path");
const stringify = require("json-stringify-pretty-compact");
const moment = require("moment");
const { child_process_script } = require("../linux-server/child");
const { getBusinessDetails } = require("../yelpFusion/yelpFusingApi");
const { getTaxRates } = require("../shoppingCart/shopperDetsils");

//SQL
const { sqlGetRecords } = require("../sql/getRecords");
const { sqlInsertRecords } = require("../sql/insertRecords");
const { sqlUpdateRecords } = require("../sql/updateRecords");
const { sqlDeleteRecords } = require("../sql/deleteRecords");

//PG
const { pgGetRecords } = require("../pg/getRecords");
const { pgInsertRecords } = require("../pg/insertRecords");
const { pgUpdateRecords } = require("../pg/updateRecords");
const { pgDeleteRecords } = require("../pg/deleteRecords");

//MongoDB
const { mgGetCollections } = require("../mg/getCollections");
const { mgInsertCollections } = require("../mg/insertCollections");
const { mgUpdateCollections } = require("../mg/updateCollections");
const { mgDeleteCollections } = require("../mg/deleteCollections");

//usageRelated
const { usageDetails } = require("../sql/usageDetails");

const port = process.env.PORT || 9000;

server.use(express.json());

//TO interact with Client
server.use(express.static(path.join(__dirname, "../client/build")));

server.use("/api/sql/getRecords", sqlGetRecords);
server.use("/api/sql/insertRecords", sqlInsertRecords);
server.use("/api/sql/updateRecords", sqlUpdateRecords);
server.use("/api/sql/deleteRecords", sqlDeleteRecords);

server.use("/api/pg/getRecords", pgGetRecords);
server.use("/api/pg/insertRecords", pgInsertRecords);
server.use("/api/pg/updateRecords", pgUpdateRecords);
server.use("/api/pg/deleteRecords", pgDeleteRecords);

server.use("/api/mg/getRecords", mgGetCollections);
server.use("/api/mg/insertRecords", mgInsertCollections);
server.use("/api/mg/updateRecords", mgUpdateCollections);
server.use("/api/mg/deleteRecords", mgDeleteCollections);

server.use("/api/runScriptOnLinuxServer", child_process_script);

server.use("/api/usageDetails", usageDetails);

server.use("/api/getTaxes", getTaxRates);

server.use("/api/getBusinessMetrics", getBusinessDetails);
server.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

server.listen(port, () => {
  console.log("Server Running on -->", port);
  console.log("Server build at", path.join(__dirname, "../client/build"));
});
