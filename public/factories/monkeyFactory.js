"use strict";

angular.module("FunWithStuff").factory("MonkeyFactory", $http => {
  return {
    // ooh, cool es6 method declarations, dude
    searchMovieDb(keyword) {
      $http.get(`/movies?keyword=${keyword}`)
        .then( movies => {
          console.log(movies);
        })
        .catch( (err) => {
          console.log("oops in movie fetch", err);
        });
    }
  };
});
