angular.module('track.services', [])

.factory('userData', function ($http, $location) {
  var storage = {};

  var getData = function (callback) {
    window.user = prompt('Username: ');
    return $http({
      method: 'GET',
      url: '/user/' + window.user,
    })
    .then(function (data) {
      callback(data.data);
      $location.path('/user/add');
    });
  };

  var getLiftData = function (liftName, callback) {
    return $http({
      method: 'GET',
      url: '/' + window.user + '/' + liftName,
    })
    .then(function (data) {
      callback(data.data);
    });
  };

  return {
    getData: getData,
    getLiftData: getLiftData,
    storage: storage
  };
});