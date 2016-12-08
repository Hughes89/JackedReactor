(function() {
  'use strict';
  
  angular
    .module('track.lift')
    .controller('liftController', liftController)
  
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
})();

