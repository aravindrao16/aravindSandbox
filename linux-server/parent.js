var exec = require("ssh-exec");

process.on("message", (payload) => {
  var execComm = `
    cd ${payload.SCRIPT_PATH}
    sh -x ${payload.SCRIPT_NAME}
    `;
  exec(
    execComm,
    {
      user: `${payload.APP_ID}`,
      host: `${payload.SERVER}`,
      password: `${payload.APPLICATION}`,
    },
    (err, stdout, stderr) => {
      if (err) {
        //Write logic here as what are the next steps
      } else {
        const successData = {
          stdout: stdout,
        };
        //Write logic here as what are the next steps
      }
    }
  );
});
