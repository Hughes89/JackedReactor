(function() {
  'use strict';

  angular
    .module('track.services')
    .factory('Auth', Auth);

  Auth.$inject = ['$http', '$location', '$window'];

  function Auth ($http, $location, $window) {
    return {
      signup: signup,
      signin: signin,
      isAuth: isAuth,
      logout: logout
    };

    function signup (user) {
      return $http({
        method: 'POST',
        url: '/api/signup',
        data: user
      }).then(function (res) {
        if (res.data === 'user') {
          return res.data;
        } else {
          localStorage.setItem('JRT', res.data.token);
          $location.path('/');
        }
      });
    }

    function signin (user) {
      return $http({
        method: 'POST',
        url: '/api/signin',
        data: user
      }).then(function (res) {
        var data = res.data;
        if (data === 'user' || data === 'password') {
          return data;
        } else {
          localStorage.setItem('JRT', data.token);
          $location.path('/');
        }
      });
    }

    function isAuth () {
      return !!localStorage.getItem('JRT');
    }

    function logout () {
      localStorage.removeItem('JRT');
      $location.path('/signin');
    }
  }
})();