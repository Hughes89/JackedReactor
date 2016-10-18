angular.module('track.nav', [])

.controller('navController', function ($scope, $stateParams, $http, userData) {
  $scope.data = {};
  $scope.user = window.user;
  $scope.data.liftList = [];
  $scope.makeUnique = function (array) {
    array.forEach(function (ele) {
      if ($scope.data.liftList.indexOf(ele.lift) === -1) {
        $scope.data.liftList.push(ele.lift);
      }
    });
  };
  $scope.getLifts = userData.getData;
  $scope.getLifts($scope.makeUnique);
});