const axios = require("axios");

var headersToUse = { headers: { "Content-Type": "application/json" } };
const getBusinessDetails = async (req, res) => {
  const { type, payload } = req.body;
  console.log("Payload", payload);
  headersToUse.headers[
    "authorization"
  ] = `Bearer yOGDQWaqlWk5hXbR_O6FqKwkLk29Ac3e2LNgHoUDltnDrlsMGchXdlkohIy9O3Vmi-DBhydMFtahhJufziNpFtW3Qei-PnK-FBIPlA4cbP34ssp-UR-_agFzcIsuYHYx`;
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

module.exports = {
  getBusinessDetails,
};
