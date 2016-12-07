angular.module('track.lift', [])

.controller('liftController', function ($scope, $stateParams, $location, $http, userData) {
  $scope.lift = $stateParams.lift;
  $scope.data = {};
  $scope.data.lift = false;
  $scope.getLiftData = userData.getLiftData;
  $scope.getLiftData($scope.lift, function (data) {
    $scope.xkey = 'date'; 
    $scope.ykeys = ['OneRepMax'];
    $scope.labels = ['One Rep Max'];
    $scope.myModel = data;
    $scope.data.title = data;
    $scope.data.lift = true;
  });

  $scope.deleteLiftCollection = function () {
    var choice = confirm('Are you sure?');
    if (choice) {
      $http({
        method: 'DELETE',
        url: '/api/delete/' + $scope.lift,
      }).success(function () {
        $location.path('/');
      });
    }
  };
  
})

.directive('linechart', function() {
  return {
    restrict: 'E',
    template: '<div></div>',
    replace: true,
    link: function($scope, element, attrs) {
      var data = $scope[attrs.data],
      xkey = $scope[attrs.xkey],
      ykeys= $scope[attrs.ykeys],
      labels= $scope[attrs.labels];
      Morris.Line({
        element: element,
        data: data,
        xkey: xkey,
        ykeys: ykeys,
        labels: labels,
        parseTime: false,
        resize: true
      });
    }
  };
});
