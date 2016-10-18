angular.module('track.nav', [])

.controller('navController', function ($scope, $stateParams, $http, userData) {
  userData.getData();
  $scope.data = {};
  $scope.hello = 'Hello';
  
  
  $scope.lift = '';
  $scope.weight = '';
  $scope.sendLift = function () {
    var storage = [window.user, $scope.lift, $scope.weight];
    return $http({
      method: 'POST',
      url: '/submitLift',
      data: storage
    });
  };
});