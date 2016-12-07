angular.module('track.add', [])

.controller('addController', function ($scope, $stateParams, $http, $location, userData, Auth) {
  $scope.lift = '';
  $scope.weight = '';
  $scope.reps = '';
  $scope.sendLift = function () {
    var storage = {
      lift: $scope.lift.toLowerCase(),
      weight: $scope.weight,
      reps: $scope.reps
    };
    $http({
      method: 'POST',
      url: '/api/submitLift',
      data: storage
    });
    var path = $scope.lift.toLowerCase();
    var first = path[0].toUpperCase();
    $location.path('/' +  first + path.substr(1));
  };
  

});