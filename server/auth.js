const userJson = {
  name: "Aravind",
  email: "aravindrao.gone16@gmail.com",
  id: "aravindrao.gone16",
  admin: true,
  user: false,
};

const authenticateUser = (req, res, next) => {
  req.userValidation = userJson;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};

module.exports = {
  authenticateUser,
};
