angular.module('track', ['track.nav','track.services','ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/navigation/nav.html',
    controller: 'navController' 
  });
});