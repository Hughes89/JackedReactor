angular.module('track.add', [])

.controller('addController', function ($scope, $stateParams, $http, $location, userData) {
  $scope.lift = '';
  $scope.weight = '';
  $scope.reps = '';

  $scope.sendLift = function () {
    $scope.total = Math.round($scope.weight * (1 + ($scope.reps/30)));
    var storage = [window.user, $scope.lift, $scope.total];
    $http({
      method: 'POST',
      url: '/submitLift',
      data: storage
    });
    userData.storage.liftList.push($scope.lift);
    $location.path('/user/' + $scope.lift);
    };
  

});