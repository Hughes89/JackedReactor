(function() {
  'use strict';

  angular
    .module('track', [
    'track.nav',
    'track.add',
    'track.lift',
    'track.signin',
    'track.signup',
    'track.menu',
    'track.services',
    'ui.router'])
    .config(config)
    .factory('AttachTokens', AttachTokens)
    .run(authRoutes);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];
  authRoutes.$inject = ['$rootScope', '$state', 'Auth'];
  AttachTokens.$inject = ['$window'];

  function config ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/signin');
    $stateProvider
    .state('add', {
      url: '/',
      templateUrl: 'app/add/add.html',
      controller: 'addController',
      authenticate: true
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'app/signin/signin.html',
      controller: 'signinController',
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/signup/signup.html',
      controller: 'signupController'
    })
    .state('lift', {
      url: '/:lift',
      templateUrl: 'app/lift/lift.html',
      controller: 'liftController',
      authenticate: true
    });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true); //Remove the '#' from URL.
    $httpProvider.interceptors.push('AttachTokens');
  }

  function AttachTokens ($window) {
    const attach = {
      request: function (object) {
        const jwt = $window.localStorage.getItem('JRT');
        if (jwt) {
          object.headers['x-access-token'] = jwt;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
  }

  function authRoutes ($rootScope, $state, Auth) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (toState.name === 'lift' || toState.name === 'add') {
        if (!Auth.isAuth()) {
          event.preventDefault();
          $state.go('signin');
        }
      }
    });
  }

})();