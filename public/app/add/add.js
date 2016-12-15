(function() {
  'use strict';
  
  angular
    .module('track.add', [])
    .controller('addController', addController);
      
  addController.$inject = ['$scope', 'userData', 'Auth'];

  function addController ($scope, userData, Auth) {
    $scope.lift = '';
    $scope.weight = '';
    $scope.reps = '';
    $scope.sendLift = sendLift;
    
    function sendLift () {
      const storage = {
        lift: $scope.lift.toLowerCase(),
        weight: $scope.weight,
        reps: $scope.reps
      };
      userData.submitLift(storage);
    }
  }
 })();