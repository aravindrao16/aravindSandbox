const { MongoClient } = require("mongodb");

const mgInsertCollections = (req, res) => {
  const { type, payload } = req.body;
  const uri =
    "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";
  MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then((client) => {
      console.log("Connected to Database");
      const db = client.db("star-wars-quotes");
      const quotesCollection = db.collection("quotes");
      quotesCollection
        .insertOne(payload)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => console.error(error));
    })
    .catch((err) => {
      res.send(err.message);
    });
};

module.exports = {
  mgInsertCollections,
};
