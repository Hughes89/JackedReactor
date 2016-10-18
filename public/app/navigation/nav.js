angular.module('track.nav', [])

.controller('navController', function ($scope, $stateParams, $http, userData) {
  $scope.data = {};
  $scope.user = window.user;
  $scope.workout = $stateParams;
  //console.log($stateParams);
 
});