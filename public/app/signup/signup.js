(function() {
  'use strict';
  
  angular
    .module('track.signup', [])
    .controller('signupController', signupController);
    
  signupController.$inject = ['$scope', 'Auth'];

  function signupController ($scope, Auth) {
    $scope.user = {};
    $scope.err = '';
    $scope.error = false;
    $scope.signup = signup;

    function signup () {
      if ($scope.user.password.length >= 8) {
        Auth.signup($scope.user)
          .then(data => {
            if (data === 'user') {
              $scope.error = 'Username unavailable.';
              $scope.err = true;
            }
          });
      } else {
        $scope.error = 'Password must be 8 characters long.';
        $scope.err = true;
      }
    }
  }

})();