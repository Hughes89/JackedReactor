angular.module('track', ['track.nav', 'track.add', 'track.lift', 'track.services', 'ngMaterial', 'ui.router'])

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