angular.module('track', [
  'track.nav',
  'track.add',
  'track.lift',
  'track.signin',
  'track.signup',
  'track.menu',
  'track.services',
  'ui.router'
])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
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
  })

  .factory('AttachTokens', function ($window) {
    var attach = {
      request: function (object) {
        var jwt = $window.localStorage.getItem('token');
        if (jwt) {
          object.headers['x-access-token'] = jwt;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
  })

  .run(function ($rootScope, $state, Auth) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (toState.name === 'lift' || toState.name === 'add') {
        if (!Auth.isAuth()) {
          event.preventDefault();
          $state.go('signin');
        }
      }
    });
  });

  // .controller('PositionDemoCtrl', function DemoCtrl($mdDialog) {
  //   var originatorEv;
  //   this.openMenu = function($mdOpenMenu, ev) {
  //     originatorEv = ev;
  //     $mdOpenMenu(ev);
  //   };
  //   this.announceClick = function(index) {
  //     $mdDialog.show(
  //       $mdDialog.alert()
  //         .title('You clicked!')
  //         .textContent('You clicked the menu item at index ' + index)
  //         .ok('Nice')
  //         .targetEvent(originatorEv)
  //     );
  //     originatorEv = null;
  //   }

  // });