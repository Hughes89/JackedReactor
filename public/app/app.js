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

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
    };
  });