angular.module('track', ['track.nav','track.services','ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'app/navigation/nav.html',
    controller: 'navController' 
  });
});