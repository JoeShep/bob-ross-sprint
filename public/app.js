"use strict";

// REMEMBER! Gotta use /#!/ in URLS to make this work. Otherwise, it will ping the Node server
angular.module("MovieWatchlist", ["ngRoute"]).config($routeProvider => {
  $routeProvider
    .when("/test", {
      templateUrl: "partials/test.html",
      controller: "TestCtrl",
      // resolve calls its methods when the route tries to load
      resolve: { restricted: () => true }
    })
    .when("/", {
      templateUrl: "partials/movies.html",
      controller: "MovieCtrl",
      resolve: { restricted: () => false }
    })
    .when("/auth", {
      templateUrl: "partials/form.html",
      controller: "AuthCtrl",
      resolve: { restricted: () => false }
    })
    .otherwise("/");
});

// The run method is a good place for a route change listener since it runs only once on initialization after the injector is finished loading all the modules.
angular
  .module("MovieWatchlist")
  .run(($rootScope, $location, $route, AuthFactory) => {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      AuthFactory.setUserStatus().then(() => {
        console.log("user", AuthFactory.getCurrentUser());

        // check if next route is restricted and there's no user?
        if (next.resolve.restricted() && !AuthFactory.getCurrentUser()) {
          $location.path("/auth");
          $route.reload(); // or try $window.location.url = ("#!/auth")
        }
      });
    });
  });
