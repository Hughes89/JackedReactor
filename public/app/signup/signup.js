angular.module('track.signup', [])

.controller('signupController', function ($scope, $stateParams, $http, $location, Auth) {
  $scope.user = {};
  $scope.err = false;

  $scope.signup = function () {
    if ($scope.user.password.length >= 8) {
      Auth.signup($scope.user);
    } else {
      $scope.err = true;
    }
  };
});