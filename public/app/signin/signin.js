angular.module('track.signin', [])

.controller('signinController', function ($scope, $stateParams, $http, $location, Auth) {
  $scope.user = {};
  $scope.errorMsg = '';

  $scope.checkError = function (error){
    if (error.data.error === 'No user') {
      $scope.errorMsg = 'Incorrect Password.';
    } else if (error.data.error === 'User does not exist') {
      $scope.errorMsg = 'Username does not exist.';
    }
  };

  $scope.signin = function () {
    Auth.signin($scope.user)
  }

});