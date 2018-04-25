"use strict";

angular
  .module("MovieWatchlist")
  .controller("MovieCtrl", function($scope, MovieFactory) {
    $scope.keyword = "";

    $scope.findMovies = () => {
      MovieFactory.findMovies($scope.keyword).then(movies => {
        $scope.movieList = movies.data;
      });
    };
  });
