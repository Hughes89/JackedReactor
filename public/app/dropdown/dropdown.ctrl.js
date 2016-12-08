(function() {
  'use strict';

  angular
    .module('track.menu')
    .controller('dropDownMenu', dropDownMenu);
    
  dropDownMenu.$inject = ['$scope', '$location', 'userData'];

  function dropDownMenu ($scope, $location, userData) {
    $scope.data = {};
    $scope.getLifts = getLiftsFunction;
    window.onclick = clicker;
    $scope.goto = function (path) {
      $location.path('/' + path);
    };
    
    function getLiftsFunction () {
      userData.getData()
        .then((data) => {
          $scope.data.liftList = data;
        })
      document.getElementById('myDropdown').classList.toggle('show');
    }

    function clicker (event) {
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
    }
  }
})();