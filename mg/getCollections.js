const { MongoClient } = require("mongodb");

const mgGetCollections = (req, res) => {
  const { type, payload } = req.body;
  const uri =
    "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";
  MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then((client) => {
      console.log("Connected to Database");
      const db = client.db("star-wars-quotes");
      db.collection("quotes")
        .find()
        .toArray()
        .then((results) => {
          console.log(results);
          res.send(results);
        })
        .catch((error) => {
          console.error(error);
          res.send(error.message);
        });
    })
    .catch((err) => {
      res.send(err.message);
    });
};

module.exports = {
  mgGetCollections,
};
