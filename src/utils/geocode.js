const request = require("request");

const geoCode = (adress, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    adress +
    ".json?access_token=pk.eyJ1IjoiZGRlcmFuY291cnQiLCJhIjoiY2s2bHo1YjJlMGlxczNzcnJkMDdqdWlsMyJ9.lg7tJwNDGR7CRtgpDZJuZA";

  request({ url, json: true }, (error, { body }) => {
    if (error) callback("unable to connect to location services");
    else if (body.features.length === 0)
      callback("unable to find location, try another search");
    else
      callback(undefined, {
        lattitude: body.features[1].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
  });
};

module.exports = geoCode;
