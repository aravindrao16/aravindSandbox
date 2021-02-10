const cp = require("child_process");

const child_process_script = (req, res) => {
  const { payload } = req.body;
  const worker = cp.fork("./parent.js");
  worker.send(payload);
  worker.on("message", function (msg) {
    console.log("Message", msg);
  });
  res.send("Success");
};

module.exports = {
  child_process_script,
};
