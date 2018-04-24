"use strict";

angular
  .module("FunWithStuff")
  .controller("monkey-controller", function($scope, MonkeyFactory) {
    $scope.monkeyName = "Ook";
    MonkeyFactory.searchMovieDb("monkey");
  });
