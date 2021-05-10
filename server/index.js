require("dotenv").config;
require("log-timestamp");

//Core Modules of Node
const http = require("http");
const stream = require("stream");
const util = require("util");
const url = require("url");
const fs = require("fs");
const querystring = require("querystring");
const zlib = require("zlib");
//

const express = require("express");
const server = express();
const axios = require("axios");
const path = require("path");
const auth = require("./auth");
const stringify = require("json-stringify-pretty-compact");
const moment = require("moment");
const { child_process_script } = require("../linux-server/child");
const {
  getBusinessDetails,
  getVehicleDetails,
} = require("../yelpFusion/yelpFusingApi");
const { getTaxRates } = require("../shoppingCart/shopperDetsils");

const { getEmployeeData } = require("../mccTech/employee");
const upload = require("./multer.js");
const { test } = require("../mccTech/mindtree");

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

const {
  filetrEmployeeBasedOnSalery,
} = require("../employeeList/filetrEmplyees");
const { Timestamp } = require("bson");
const { timeStamp } = require("console");

const port = process.env.PORT || 9000;

server.use(express.json());

//TO interact with Client
server.use(express.static(path.join(__dirname, "../client/build")));

server.use(auth.authenticateUser);

server.use("/api/auth", (req, res) => {
  res.send(req.userValidation);
});

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

server.use("/api/getEmployeeInfo", (req, res) => {
  const result = filetrEmployeeBasedOnSalery();
  res.send(result);
});

server.use("/api/getVehicleDetails", (req, res) => {
  const result = getVehicleDetails();
  res.send(result);
});

server.use("/api/getEmployees", getEmployeeData);

server.use("/api/insertFile", upload.single("image"), (req, res) => {
  const timeStamp = moment(Date.now().format("MM-DD-YYYY HH:mm:ss Z"));
  knex("TABLE_NAME")
    .insert({
      ATTACHMENT_NAME: req.body.attachmentName,
      FILE_NAME: req.file.originalName,
      CREATED: timeStamp,
      MODIFIED: timeStamp,
      FILE_TYPE: req.file.mimetype,
      IMAGE: req.file.buffer,
      MODIFIEDBY_NAME: "Aravind",
      MODIFIEDBY_EMAIL: "aravindgone@lithia.com",
    })
    .then((result) => {
      res.send("Success");
    })
    .catch((err) => {
      console.log("error", err.message);
      res.send(err.message);
    });
});

server.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

server.listen(port, () => {
  console.log("Server Running on -->", port);
  //test(1, 2);
  console.log("Server build at", path.join(__dirname, "../client/build"));
});
