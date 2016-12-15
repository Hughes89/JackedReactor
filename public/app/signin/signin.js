(function() {
  'use strict';

  angular
    .module('track.signin', [])
    .controller('signinController', signinController);
  
  signinController.$inject = ['$scope', 'Auth'];
    
  function signinController ($scope, Auth) {
    $scope.user = {};
    $scope.errorMsg = '';
    $scope.signin = signin;

    function signin () {
      Auth.signin($scope.user)
        .then(data => checkError(data));
    }

    function checkError (error){
      return error === 'password' ? $scope.errorMsg = 'Incorrect Password.' : $scope.errorMsg = 'Username does not exist.';
    }
  }

})();