"use strict";

angular
  .module("MovieWatchlist")
  .controller("MovieCtrl", function($scope, MovieFactory) {
    $scope.keyword = "";

    $scope.findMovies = () => {
      MovieFactory.findMovies($scope.keyword).then(movies => {
        const movieList = movies.data.map( (movie) => {
          const splitTitle = movie.title.split(" - ");
          movie.mainTitle = splitTitle[0];
          movie.subTitle = splitTitle[1];
          return movie;
        });
        $scope.movieList = movieList;
      });
    };
  });
