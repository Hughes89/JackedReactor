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

.config(function($mdIconProvider) {
    $mdIconProvider
      .iconSet("call", 'img/icons/sets/communication-icons.svg', 24)
      .iconSet("social", 'img/icons/sets/social-icons.svg', 24);
  })
  .controller('PositionDemoCtrl', function DemoCtrl($mdDialog) {
    var originatorEv;
    this.menuHref = "http://www.google.com/design/spec/components/menus.html#menus-specs";
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