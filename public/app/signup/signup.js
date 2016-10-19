angular.module('track.signup', [])

.controller('signupController', function ($scope, $stateParams, $http, $location, Auth) {
  $scope.user = {};
  $scope.err = false;
  $scope.error = false;

  $scope.signup = function () {
    if ($scope.user.password.length >= 8) {
      Auth.signup($scope.user)
        .error(function (err) {
          if (err) {
            $scope.error = true;
          }
        });
    } else {
      $scope.err = true;
    }
  };
});