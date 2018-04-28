"use strict";

// REMEMBER! Gotta use /#!/ in URLS to make this work. Otherwise, it will ping the Node server
angular.module("MovieWatchlist", ["ngRoute"]).config($routeProvider => {
  $routeProvider
    .when("/test", {
      templateUrl: "partials/test.html",
      controller: "TestCtrl"
    })
    .when("/", {
      templateUrl: "partials/form.html",
      controller: "AuthCtrl"
    })
    .when("/movies", {
      templateUrl: "partials/movies.html",
      controller: "MovieCtrl"
    });

  // .when("/songs/:songId", {
  // 	templateUrl: "partials/songDetail.html",
  // 	controller: "SongDetailCtrl"
  // })
  // .otherwise("/");
});
