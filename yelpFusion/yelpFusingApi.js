const axios = require("axios");
const kbb =
  "https://sandbox.api.kbb.com/idws/vehicle/vin/id/KL4CJFSB8EB517550?vehicleClass=UsedCar&optionFilter=DecodedOnly&api_key=c9f1ccfb564f4683b376670c3";
var headersToUse = { headers: { "Content-Type": "application/json" } };
const getBusinessDetails = async (req, res) => {
  const { type, payload } = req.body;
  console.log("Payload", payload);
  headersToUse[
    "authorization"
  ] = `Bearer rTAnZA-fFrJmMSFtyfWjcU6ILfmRf18fz2I-472XDGnfwRm1r92aYfIEfj0ohjIJ3wZmVgj4iCr_6Fa9VFiL4hYVJ1VpRzMm2rlRhubdPiPi9iZOB9w1zzuVRE44YHYx`;
  if (type === "businessSearch") {
    let url = `https://api.yelp.com/v3/businesses/search?term=${payload.typeOfSearch}&location=${payload.location}`;
    axios
      .get(url, headersToUse)
      .then((result) => {
        console.log("Result", result);
        res.send(result.data);
      })
      .catch((err) => {
        res.send(err.message);
      });
  } else if (type === "review") {
    const businessIds = payload.businessId;
    const reviewsArray = [];
    for (let i = 0; i < businessIds.length; i++) {
      let url = `https://api.yelp.com/v3/businesses/${businessIds[i]}/reviews`;
      await axios
        .get(url, headersToUse)
        .then((result) => {
          console.log("Review Result", result.data);
          if (result.data && result.data.reviews.length > 0) {
            reviewsArray.push(result.data.reviews[0].user.name);
          } else {
            reviewsArray.push("n/a");
          }
        })
        .catch((err) => {
          res.send("Failed");
        });
    }
    res.send(reviewsArray);
  }
};

const getVehicleDetails = () => {
  axios
    .get(kbb)
    .then((result) => {
      console.log("Result", result.data);
      return result.data;
    })
    .catch((err) => {
      return err.message;
    });
};

module.exports = {
  getBusinessDetails,
  getVehicleDetails,
};
