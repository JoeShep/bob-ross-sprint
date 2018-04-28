"use strict";

angular
  .module("MovieWatchlist")
  .controller("MovieCtrl", function($scope, MovieFactory) {
    $scope.keyword = "";

    $scope.findMovies = () => {
      MovieFactory.findMovies($scope.keyword).then(movies => {
        const movieList = movies.data.map(movie => {
          // Specific fix for Star Wars movies, but might be able to generalize?
          const splitTitle = movie.title.split(" - ");
          movie.mainTitle = splitTitle[0];
          // Shorten the title if it collides with the "add" button
          movie.mainTitleNarrow =
            splitTitle[0].length > 22
              ? `${splitTitle[0].slice(0, 23)}...`
              : splitTitle[0];
          movie.subTitle = splitTitle[1];
          console.log(movie);
          return movie;
        });
        $scope.movieList = movieList;
      });
    };

    $scope.addToWatchlist = (imdb_id) => {
      console.log(imdb_id);
      MovieFactory.postToWatchlist({user_id: 1, imdb_id}).then( (movData) => {
        console.log("watchlist item added", movData);
      });
    };

  });
