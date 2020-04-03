const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/73c275d769b23028f70a7a69360b493a/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (response.body.error) {
      callback("Unable to find location");
    } else {
      const currentWeather = response.body.currently;
      const dailyWeather = response.body.daily;

      const resString =
        `${dailyWeather.data[0].summary} ` +
        `It is currently ${currentWeather.temperature} degrees out. ` +
        `There is a ${currentWeather.precipProbability}% chance of rain`;

      callback(undefined, resString);
    }
  });
};

module.exports = forecast;
