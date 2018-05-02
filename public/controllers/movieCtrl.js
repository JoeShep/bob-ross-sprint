"use strict";

angular
  .module("MovieWatchlist")
  .controller("MovieCtrl", function($scope, MovieFactory) {
    $scope.keyword = "";
    let currentUserId = null;

    $scope.$on("handleBroadcast", function(event, user) {
      console.log("handleBroadcast called in movieCtrl", user);
      MovieFactory.getWatchlist(user.id)
        .then(watchlist => {
          console.log("watch", watchlist);
          currentUserId = user.id;
          $scope.watchlist = watchlist.data ? true : false;
          console.log("watchlist thing", $scope.watchlist);
        })
        .catch(err => {
          console.log("error fetching watchlist", err);
        });
    });

    $scope.findMovies = () => {
      MovieFactory.findMovies($scope.keyword).then(movies => {
        const movieList = movies.data.map(movie => {
          if (movie.poster === "N/A")
            movie.poster = "/images/poster-coming-soon.jpg";
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

    $scope.addToWatchlist = imdb_id => {
      console.log(imdb_id);
      MovieFactory.postToWatchlist({ user_id: currentUserId, imdb_id }).then(
        movData => {
          console.log("watchlist item added", movData);
          $scope.watchlist = true;
        }
      );
    };
  });
