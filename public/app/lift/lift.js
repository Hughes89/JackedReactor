angular.module('track.lift', [])

.controller('liftController', function ($scope, $stateParams, $http, userData) {
  $scope.lift = $stateParams.lift;
  $scope.data = {};
  $scope.data.lift = false;
  $scope.getLiftData = userData.getLiftData;
  $scope.getLiftData($scope.lift, function (data) {
    $scope.xkey = 'date'; 
    $scope.ykeys = ['weight'];
    $scope.labels = ['Weight Lifted'];
    $scope.myModel = data;
    $scope.data.lift = true;
  });

})

.directive('linechart', function() {
  return {
    restrict: 'E',
    template: '<div></div>',
    replace: true,
    link: function($scope, element, attrs) {
      console.log($scope[attrs.data])
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
        parseTime: false
      });
    }
  };
});
