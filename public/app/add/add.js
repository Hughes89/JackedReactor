angular.module('track.add', [])

.controller('addController', function ($scope, $stateParams, $http, userData) {
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