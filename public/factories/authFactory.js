"use strict";

angular.module("MovieWatchlist").factory("AuthFactory", $http => {
  let currentUser = null;

  return {
    createUser(userObj) {
      return $http.post("/register", userObj).then(userData => {
        console.log("new user added", userData);
        currentUser = userData;
        return userData.data;
      });
    },

    loginUser(userObj) {
      return $http.post("/login", userObj).then(user => {
        currentUser = user;
      });
    },

    getCurrentUser() {
      return currentUser;
    },

    // let logoutUser = function() {
    //   return firebase.auth().signOut();
    // };

    setUserStatus() {
      return $http
        .get("/user/status")
        .then( ({user}) => {
          if (user) {
            currentUser = user;
          } else {
            currentUser = null;
          }
        })
        .catch(() => {
          currentUser = null;
        });
    }

    // let getUser = function() {
    //   return currentUser;
    // };
  };
});
