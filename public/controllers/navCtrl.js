"use strict";

angular
  .module("MovieWatchlist")
  .controller("NavCtrl", function($scope, AuthFactory, $location) {
    $scope.$on("handleBroadcast", function(event, user) {
      console.log("SOMETHING CHANGED!!", user);
      $scope.currentUser = user; //'contentPage'
    });

    $scope.logout = () => {
      AuthFactory.logoutUser().then(() => {
        $location.path("/auth");
      });
    };
  });
