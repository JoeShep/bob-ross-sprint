"use strict";

// REMEMBER! Gotta use /#!/ in URLS to make this work. Otherwise, it will ping the Node server
angular.module("FunWithStuff", ["ngRoute"]).config($routeProvider => {
  $routeProvider.when("/test", {
    templateUrl: "partials/test.html",
    controller: "TestCtrl"
  });
  // .when("/todo", {
  // 	templateUrl: "partials/todos.html",
  // 	controller: "TodoCtrl"
  // })
  // .when("/songs", {
  // 	templateUrl: "partials/songs.html",
  // 	controller: "SongCtrl"
  // })
  // .when("/songs/:songId", {
  // 	templateUrl: "partials/songDetail.html",
  // 	controller: "SongDetailCtrl"
  // })
  // .otherwise("/");
});
