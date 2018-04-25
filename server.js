"use strict";

const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const routes = require("./app/routes");
const movieAPI = require("imdb-api");

// keep for demo of concurrently
// const cow = man;

app.set("models", require("./app/models"));

// This "express.static" middleware will handle all the requested files we need to send to the browser: index.html, css, and JS files. All other html will be generated and displayed by Angular, on the client side of things
app.use(express.static(__dirname + "/public"));
app.use(
  "/angular",
  express.static(__dirname + "/node_modules/angular/")
);
app.use(
  "/angular-route",
  express.static(__dirname + "/node_modules/angular-route/")
);

// Any requests that have to do with authentication or data from the movie API will be handled by Node
// Inject session persistence into middleware stack
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
); // session secret

//execute passport strategies file
require("./app/config/passport-strat.js");
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

// first test of hooking up to angular
app.get("/monkeys", (req, res) => {
  console.log("monkey route activated", req.query.keyword);
  res
    .status(200)
    .json({ "monkey keyword": `The secret word is ${req.query.keyword}` });
});

app.get("/movies", (req, res, next) => {
  console.log("get movies called");
  console.log(req.query.keyword);

  movieAPI
    .search({ title: req.query.keyword }, { apiKey: "b3bd2b6a" })
    .then(data => {
      // console.log("movies?", data.results);
      return Promise.all([data, data.next()]);
    })
    .then(allTheData => {
      // spread operator is cool! But what if we decided to get more than x pages of results?
      // [...allTheData[0].results, ...allTheData[1].results];
      // This allows a dynaic number of results to be squished into one array
      const movies = [].concat(...allTheData.map(search => search.results));
      // console.log("all the movies", movies);
      res.status(200).json(movies);
    })
    .catch(err => {
      console.log("oops", err);
      next(err);
    });
});

// Use this to show how it works for get, and how we will use hash-bang with Angular to avoid requesting a route from this server
app.get("/test", (req, res) => {
  console.log("test route");
  res.status(200).json({ test: "Hooray!" });
});

app.use((req, res, next) => {
  let err = new Error("This resource was not found");
  console.log("404 handler");
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  // one error handler to rule them all
  res.json({
    message: "You blew it",
    err: err.message
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
