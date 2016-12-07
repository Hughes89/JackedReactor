angular.module('track.nav', [])

.controller('navController', function ($scope, $stateParams, $location, $http, userData, Auth) {
  $scope.data = {};
  $scope.goto = function (path) {
    $location.path('/' + path);
  };

  $scope.isAuth = Auth.isAuth;
  $scope.logout = function () {
    $scope.data.liftList = [];
    Auth.logout();
  };
})

.directive('navBar', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/navigation/nav.html'
  };
});