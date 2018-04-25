"use strict";

angular
  .module("MovieWatchlist")
  .controller("monkeyCtrl", function($scope, MonkeyFactory) {
    $scope.monkeyName = "Ook";
    MonkeyFactory.findMonkeys("monkey");
  });
