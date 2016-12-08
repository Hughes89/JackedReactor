(function() {
  'use strict';
  
  angular
    .module('track.nav')
    .directive('navBar', navBar);

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