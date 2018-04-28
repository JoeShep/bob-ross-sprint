"use strict";

angular
  .module("MovieWatchlist")
  .controller("AuthCtrl", function($scope, AuthFactory, $window) {
    $scope.account = {};

    $scope.register = () => {
      $scope.errorMsg = "";
      if ($scope.account.password !== $scope.account.passwordConf) {
        console.log("bad match");
        $scope.errorMsg =
          "Password and confirmation don't match. Please try again";
        return null;
      }
      AuthFactory.createUser($scope.account).then( () => {
        $window.location.href = "#!/movies/";  //what should be the route here? ?user=<id> or /id or nothing..... Let's go with nothing, and save the user info to a factory before we re-route. Then we can ping the factory for user info once we get to the new route.
      });
    };

    $scope.login = () => {
      console.log("scope account?", $scope.account);
      AuthFactory.loginUser($scope.account).then( () => {
        console.log("logged in controller", AuthFactory.getCurrentUser());
        $window.location.href = "#!/movies";
      });
    };
  });
