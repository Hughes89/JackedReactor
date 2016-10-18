angular.module('track', ['track.nav', 'track.add', 'track.lift', 'track.services', 'ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/user');
  $stateProvider
  .state('home', {
    url: '/user',
    templateUrl: 'app/navigation/nav.html',
    controller: 'navController' 
  })
  .state('home.add', {
    url: '/add',
    templateUrl: 'app/add/add.html',
    controller: 'addController'
  })
  .state('home.lift', {
    url: '/:lift',
    templateUrl: 'app/lift/lift.html',
    controller: 'liftController'
  })
});