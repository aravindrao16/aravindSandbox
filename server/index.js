require("dotenv").config;
require("log-timestamp");

const express = require("express");
const server = express();
const axios = require("axios");
const path = require("path");
const stringify = require("json-stringify-pretty-compact");
const moment = require("moment");

const port = process.env.PORT || 9000

server.use(express.json());

//TO interact with Client
server.use(express.static(path.join(__dirname, "../client/build")))

server.use("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "../client/build", "index.html"))    
})

server.listen(port, () =>{
    console.log("Server Running on -->", port);
    console.log("Server build at", path.join(__dirname, "../client/build"))
})