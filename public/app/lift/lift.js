angular.module('track.lift', [])

.controller('liftController', function ($scope, $stateParams, $http, userData) {
  $scope.xkey = 'range'; 
  $scope.ykeys = ['total_tasks',     'total_overdue'];
  $scope.labels = ['Total Tasks', 'Out of Budget Tasks'];
  $scope.myModel = [
    { range: 'January', total_tasks: 20, total_overdue: 5 },
    { range: 'January', total_tasks: 35, total_overdue: 8 },
    { range: 'January', total_tasks: 20, total_overdue: 1 },
    { range: 'January', total_tasks: 20, total_overdue: 6 }
  ];
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
        parseTime: false
      });
    }
  };
});
