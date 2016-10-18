angular.module('track.nav', [])

.controller('navController', function ($scope, $stateParams, userData) {
  userData.getData();
  $scope.data = {};
  $scope.hello = 'Hello';
  //console.log($scope.data.person)
});