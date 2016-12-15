(function() {
  'use strict';

  angular
    .module('track.lift')
    .controller('liftController', liftController)

  liftController.$inject = ['$scope', '$stateParams', '$state', '$location', '$http', 'userData'];

  function liftController ($scope, $stateParams, $state, $location, $http, userData) {
    $scope.lift = $stateParams.lift;
    $scope.data = {};
    $scope.data.lift = false;
    $scope.deleteLift = userData.deleteLift;
    $scope.remove = remove;
    $scope.choice = 'ORM';
    $scope.swap = swap;
    $scope.activeCSS = activeCSS;

    userData.getLiftData($scope.lift)
      .then(data => {
        $scope.xkey = 'date';
        $scope.ykeys = ['OneRepMax'];
        $scope.labels = ['One Rep Max'];
        $scope.myModel = data;
        $scope.data.liftData = data;
        $scope.data.lift = true;
      });


    function remove (id, name) {
      userData.removeLiftData(id)
        .then(res => {
          if ($scope.myModel.length > 1) {
            $scope.myModel = $scope.myModel.filter(lift => lift._id !== id);
            $state.reload();
          } else {
            userData.deleteLift(name, 'remove');
          }
        });
    }

    function swap (choice) {
      choice === 'ORM' ? $scope.choice = 'info' : $scope.choice = 'ORM';
    }

    function activeCSS (choice) {
      if (choice === 'ORM') {
        return $scope.choice === 'ORM' ? {'font-weight': 'bolder'} : {'font-weight': 'normal'};
      } else {
        return $scope.choice === 'info' ? {'font-weight': 'bolder'} : {'font-weight': 'normal'};
      }
    }
  }

})();

