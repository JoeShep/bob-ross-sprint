"use strict";

angular.module("MovieWatchlist").factory("AuthFactory", ($http, $rootScope) => {
  let currentUser = null;

  return {
    createUser(userObj) {
      return $http.post("/register", userObj).then(userData => {
        console.log("new user added", userData);
        currentUser = userData;
        return userData.data;
      });
    },
    // TODO: refactor create and login to use helper func in callback. Not DRY
    loginUser(userObj) {
      return $http.post("/login", userObj).then(user => {
        console.log("login User method in auth fact", user.data);
        currentUser = user.data;
        return user.data;
      });
    },

    logoutUser() {
      return $http.post("/logout");
    },

    getCurrentUser() {
      return currentUser;
    },

    // For when/if we lose the currentUser on page refresh/http calls
    setUserStatus() {
      return $http
        .get("/status")
        .then( (user) => {
          console.log('user in set user status', user);

          if (user) {
            currentUser = user.data;
          } else {
            currentUser = null;
          }
        })
        .catch(() => {
          currentUser = null;
        });
    },

    broadcastUserLogin(user) {
      console.log("calling broadcast", user);
      $rootScope.$broadcast('handleBroadcast', user);
    }
  };
});
