"use strict";

angular.module("MovieWatchlist").factory("MonkeyFactory", $http => {
  return {
    // ooh, cool es6 method declarations, dude
    findMonkeys(keyword) {
      $http
        .get(`/monkeys?keyword=${keyword}`)
        .then(monkey => {
          console.log(monkey);
        })
        .catch(err => {
          console.log("oops in monkey fetch", err);
        });
    }
  };
});
