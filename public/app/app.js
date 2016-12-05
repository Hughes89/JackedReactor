angular.module('track', [
  'track.nav',
  'track.add',
  'track.lift',
  'track.signin',
  'track.signup',
  'track.services',
  'ngMaterial',
  'ui.router'
])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/signin');
    $stateProvider
    .state('home', {
      url: '/user',
      templateUrl: 'app/navigation/nav.html',
      controller: 'navController',
    })
    .state('home.add', {
      url: '/add',
      templateUrl: 'app/add/add.html',
      controller: 'addController',
    })
    .state('home.lift', {
      url: '/:lift',
      templateUrl: 'app/lift/lift.html',
      controller: 'liftController',
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'app/signin/signin.html',
      controller: 'signinController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/signup/signup.html',
      controller: 'signupController'
    });
     $locationProvider.html5Mode(true); //Remove the '#' from URL.
     $httpProvider.interceptors.push('AttachTokens');
  })

  .factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
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

  .controller('PositionDemoCtrl', function DemoCtrl($mdDialog) {
    var originatorEv;
    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    this.announceClick = function(index) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('You clicked!')
          .textContent('You clicked the menu item at index ' + index)
          .ok('Nice')
          .targetEvent(originatorEv)
      );
      originatorEv = null;
    }

  });