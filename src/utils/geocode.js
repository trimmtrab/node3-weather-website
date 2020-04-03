const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYXJ0ZW16aW1pbiIsImEiOiJjazg3bmRzbDcwaWhhM2xteHdlZmd6ZzFkIn0.cYj5i2RAhsxKQuEhUUrMMA&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search");
    } else {
      const responseBody = response.body;
      const [longitude, latitude] = responseBody.features[0].center;
      const location = responseBody.features[0].place_name;

      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geocode;
