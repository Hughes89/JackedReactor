(function() {
  'use strict';

  angular
    .module('track.lift')
    .directive('liftInfo', liftInfo);

  function liftInfo() {
    return {
      restrict: 'AE',
      replace: true,
      scope: true,
      controller: 'liftController',
      templateUrl: 'app/lift/liftInfo.html'
    };
  }
})();