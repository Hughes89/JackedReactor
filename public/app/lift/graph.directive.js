(function() {
  'use strict';
  
  angular
    .module('track.lift')
    .directive('linechart', linechart);
  
  function linechart () {
    return {
      restrict: 'E',
      template: '<div></div>',
      replace: true,
      link: function($scope, element, attrs) {
        Morris.Line({
          element: element,
          data: $scope[attrs.data],
          xkey: $scope[attrs.xkey],
          ykeys: $scope[attrs.ykeys],
          labels: $scope[attrs.labels],
          parseTime: false,
          resize: true
        });
      }
    };
  }
})();