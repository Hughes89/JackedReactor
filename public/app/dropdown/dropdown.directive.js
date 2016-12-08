(function() {
  'use strict';

  angular
    .module('track.menu')
    .directive('liftDropdown', liftDropdown);

  function liftDropdown () {
    return {
      restrict: 'AE',
      replace: true,
      scope: true,
      controller: 'dropDownMenu',
      templateUrl: 'app/dropdown/dropdown.html'
    };
  }

})();