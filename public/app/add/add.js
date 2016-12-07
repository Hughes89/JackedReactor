(function() {
  'use strict';
  
  angular
    .module('track.add', [])
    .controller('addController', addController);
    
  addController.$inject = ['$stateParams', '$http', '$location', 'userData', 'Auth'];

  function addController ($stateParams, $http, $location, userData, Auth) {
    /*jshint validthis: true */
    var vm = this;
    vm.lift = '';
    vm.weight = '';
    vm.reps = '';
    vm.sendLift = sendLift;
    
    function sendLift () {
      var storage = {
        lift: vm.lift.toLowerCase(),
        weight: vm.weight,
        reps: vm.reps
      };
      userData.submitLift($http, storage);
    }
  }
})();