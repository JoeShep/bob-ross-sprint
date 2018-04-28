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
    }

    // let logoutUser = function() {
    //   return firebase.auth().signOut();
    // };

    // let isAuthenticated = function() {
    //   return new Promise((resolve, reject) => {
    //     firebase.auth().onAuthStateChanged(user => {
    //       if (user) {
    //         console.log("usr", user);
    //         currentUser = user.uid;
    //         console.log("current User", currentUser);
    //         resolve(true);
    //       } else {
    //         resolve(false);
    //       }
    //     });
    //   });
    // };

    // let getUser = function() {
    //   return currentUser;
    // };
  };
});
