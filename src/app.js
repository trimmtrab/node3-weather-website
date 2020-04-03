const express = require("express");
const path = require("path");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

// Define paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Artem Zimin"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Artem Zimin"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Are you lost, darling?",
    title: "Help",
    name: "Artem Zimin"
  });
});

app.get("/weather", (req, res) => {
  if (req.query.address === undefined) {
    res.send({
      error: "You must provide an address"
    });
    return;
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        res.send({
          error
        });
        return;
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          res.send({
            error
          });
          return;
        }

        res.send({
          address: req.query.address,
          forecast: forecastData,
          location
        });
      });
    }
  );

  // res.send({
  //   address: req.query.address,
  //   forecast: "forecast",
  //   location: "Philadelphia"
  // });
});

app.get("/products", (req, res) => {
  if (req.query.search === undefined) {
    res.send({
      error: "You must provide a search term"
    });
    return;
  }

  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "This is some helpful text",
    name: "Artem Zimin",
    title: "404"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found",
    name: "Artem Zimin",
    title: "404"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
