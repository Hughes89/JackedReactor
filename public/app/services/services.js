angular.module('track.services', [])

.factory('userData', function ($http, $location) {
  var storage = {};
  storage.liftList = [];

  var filterLifts = function (param) {
    for (var i = 0; i < storage.liftList.length; i++) {
      var lift = storage.liftList[i];
      if (lift === param) {
        storage.liftList.splice(i, i);
      }
    }
  };

  //Get user data:
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

  //Get lift data:
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
    filterLifts: filterLifts,
    storage: storage
  };
});