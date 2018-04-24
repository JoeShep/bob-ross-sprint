"use strict";

const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const routes = require("./app/routes");

// keep for demo of concurrently
// const cow = man;

app.set("models", require("./app/models"));

// This "express.static" middleware will handle all the requested files we need to send to the browser: index.html, css, and JS files. All other html will be generated and displayed by Angular, on the client side of things
app.use(express.static(__dirname + "/public"));
app.use(
  "/angular",
  express.static(__dirname + "/node_modules/angular/angular.min.js")
);
app.use(
  "/angular-route",
  express.static(__dirname + "/node_modules/angular-route/angular-route.min.js")
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
app.get("/movies", (req, res) => {
  console.log("get movies called");

  console.log(req.query.keyword);
  res.status(200).json({ "movie keyword": req.query.keyword });
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
