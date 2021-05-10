var fs = require("fs");
var data = "";

//In flowing Mode
var readerStream = fs.createReadStream("file.txt"); //Create a readable stream

readerStream.setEncoding("UTF8"); // Set the encoding to be utf8.

// Handle stream events --> data, end, and error
readerStream.on("data", function (chunk) {
  data += chunk;
});

readerStream.on("end", function () {
  console.log(data);
});

readerStream.on("error", function (err) {
  console.log(err.stack);
});

console.log("Program Ended");

//In Pause Mode
var data = "";
var chunk;

readableStream.on("readable", function () {
  while ((chunk = readableStream.read()) != null) {
    data += chunk;
  }
});

readableStream.on("end", function () {
  console.log(data);
});
