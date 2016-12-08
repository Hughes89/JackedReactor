(function() {
  'use strict';
  
  angular
    .module('track.nav', [])
    .controller('navController', navController)
    .directive('navBar', navBar);

  navController.$inject =['$scope', '$location', 'Auth']

  function navController ($scope, $location, Auth) {
    $scope.isAuth = Auth.isAuth;
    $scope.logout = Auth.logout;
    $scope.goto = function (path) {
      $location.path('/' + path);
    };
  }

  function navBar () {
    return {
      restrict: 'AE',
      replace: true,
      scope: true,
      controller: 'navController',
      templateUrl: 'app/navigation/nav.html'
    };
  }

})();