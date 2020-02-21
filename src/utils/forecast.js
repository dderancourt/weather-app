const request = require("request");

const foreCast = (lattitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/cf24e98a3f4268d8d47ed27ad1f588a3/" +
    lattitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) callback("unable to connect to location services");
    else if (body.error)
      callback("unable to find location, try another search");
    else
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " out. There is a " +
          body.currently.precipProbability +
          "% chance of rain"
      );
  });
};

module.exports = foreCast;
