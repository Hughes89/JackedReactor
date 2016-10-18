angular.module('track.services', [])

.factory('userData', function ($http, $location) {
  var storage = {};
  
  var getData = function () {
    return $http({
      method: 'GET',
      url: '/lifts',
    })
    .then(function (data) {
      console.log(data);
      storage.data = data;
    });
  };

  return {
    getData: getData,
    storage: storage
  }
});