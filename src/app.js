const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const foreCast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
//-----------------------------------------------------------define path
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//-----------------------------------------------------------hbs setup
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//-----------------------------------------------------------setup static directory
app.use(express.static(publicDirectoryPath));

//-----------------------------------------------------------routes
app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "David Derancourt" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    name: "david derancourt"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    helptext: "here is some help",
    name: "derancourt david"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({ error: "you must provide an adress" });

  const address = req.query.address;
  geoCode(address, (error, { lattitude, longitude, location } = {}) => {
    if (error) return res.send({ message: "try another location" });
    foreCast(lattitude, longitude, (error, forecastData) => {
      if (error) return res.send({ message: "no data" });
      res.send({
        location: location,
        forecastData: forecastData
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "you must provide a search term" });
  }
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "derancourt david",
    errorMessage: "Help not Found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "derancourt david",
    errorMessage: "page Not Found"
  });
});

//-----------------------------------------------------------listener
app.listen(port, () => {
  console.log("Server is UP on port " + port);
});
