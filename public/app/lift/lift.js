(function() {
  'use strict';
  
  angular
    .module('track.lift', [])
    .controller('liftController', liftController)
    .directive('linechart', linechart);
  
  liftController.$inject = ['$scope', '$stateParams', '$location', '$http', 'userData'];

  function liftController ($scope, $stateParams, $location, $http, userData) {
    $scope.lift = $stateParams.lift;
    $scope.data = {};
    $scope.data.lift = false;
    $scope.deleteLift = userData.deleteLift;

    userData.getLiftData($scope.lift)
      .then(function (data) {
        $scope.xkey = 'date'; 
        $scope.ykeys = ['OneRepMax'];
        $scope.labels = ['One Rep Max'];
        $scope.myModel = data;
        $scope.data.lift = true;
    });
  }


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

