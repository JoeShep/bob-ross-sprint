"use strict";

angular.module("MovieWatchlist").factory("MovieFactory", $http => {
  return {
    // ooh, cool es6 method declarations, dude
    findMovies(keyword) {
      return $http.get(`/movies?keyword=${keyword}`);
    }
  };
});
