angular.module('track.nav', [])

.controller('navController', function ($scope, $stateParams, $http, userData) {
  $scope.data = {};
  $scope.user = window.user;
  $scope.gotLifts = false;
  $scope.makeUnique = function (array) {
    array.forEach(function (ele) {
      if (userData.storage.liftList.indexOf(ele.lift) === -1) {
        userData.storage.liftList.push(ele.lift);
      }
    });
    $scope.data.liftList = userData.storage.liftList;
    $scope.gotLifts = true;
  };
  $scope.getLifts = userData.getData;
  $scope.getLifts($scope.makeUnique);
});