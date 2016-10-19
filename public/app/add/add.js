angular.module('track.add', [])

.controller('addController', function ($scope, $stateParams, $http, $location, userData) {
  $scope.lift = '';
  $scope.weight = '';
  $scope.reps = '';
  $scope.error = '';
  $scope.sendLift = function () {
    if ($scope.lift.length <= 1) {
      $scope.error = 'Please insert an exercise.';
    } else {
    $scope.total = Math.round($scope.weight * (1 + ($scope.reps/30)));
    var storage = [window.user, $scope.lift, $scope.total];
    $http({
      method: 'POST',
      url: '/submitLift',
      data: storage
    });
    if (userData.storage.liftList.indexOf($scope.lift) == -1) {
      userData.storage.liftList.push($scope.lift);
    }
    $location.path('/user/' + $scope.lift);
    }
  };
  

});