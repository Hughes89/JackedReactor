angular.module('track.menu', [])

.controller('dropDownMenu', function ($scope, $stateParams, $location, $http, userData, Auth) {
  $scope.data = {};

  $scope.getLifts = function () {
    userData.getData()
      .then((data) => {
        $scope.data.liftList = data;
      })
    document.getElementById('myDropdown').classList.toggle('show');
  };

  $scope.goto = function (path) {
    $location.path('/' + path);
  };

  window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    } 
  };

})

.directive('liftDropdown', function () {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/liftMenu/dropdown.html'
  };
});