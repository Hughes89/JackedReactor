angular.module('track.add', [])

.controller('addController', function ($scope, $stateParams, $http, userData) {
  $scope.lift = '';
  $scope.weight = '';
  $scope.reps = '';

  $scope.sendLift = function () {
    $scope.total = Math.round($scope.weight * (1 + ($scope.reps/30)));
    var storage = [window.user, $scope.lift, $scope.total];
    $scope.lift = '';
    $scope.weight = '';
    $scope.reps = '';
    $http({
      method: 'POST',
      url: '/submitLift',
      data: storage
    });
  };

});