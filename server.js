"use strict";

const express = require("express");
const app = express();

// keep for demo of concurrently
// const cow = man;
app.use(express.static(__dirname + "/public"));
app.use(
  "/angular",
  express.static(__dirname + "/node_modules/angular/angular.min.js")
);
app.use(
  "/angular-route",
  express.static(__dirname + "/node_modules/angular-route/angular-route.min.js")
);

app.get("/movies", (req, res, next) => {
  console.log("get movies called");

  console.log(req.query.keyword);
  res.status(200).json({ "movie keyword": req.query.keyword });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
