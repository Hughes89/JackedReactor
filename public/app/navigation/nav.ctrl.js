(function() {
  'use strict';
  
  angular
    .module('track.nav')
    .controller('navController', navController);

  navController.$inject = ['$scope', '$location', 'Auth'];

  function navController ($scope, $location, Auth) {
    $scope.isAuth = Auth.isAuth;
    $scope.logout = Auth.logout;
  }
})();