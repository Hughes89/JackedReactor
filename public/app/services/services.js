angular.module('track.services', [])

.factory('userData', function ($http, $location) {
  var storage = {};
  storage.liftList = [];

  var filterLifts = function (param) {
    for (var i = 0; i < storage.liftList.length; i++) {
      var lift = storage.liftList[i];
      if (lift === param) {
        storage.liftList.splice(i, i + 1);
      }
    }
  };

  var getData = function (callback) {
    // window.user = prompt('Username: ');
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
    filterLifts: filterLifts,
    storage: storage
  };
})

.factory('Auth', function ($http, $location, $window) {
  var isAuth = false;

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    }).success(function (data) {
      window.user = data;
      $location.path('/user/add');
    });
  };

  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/signin',
      data: user
    }).success(function (data) {
      window.user = data;
      $location.path('/user/add');
    });
  };

  return {
    signup: signup,
    signin: signin
  };

});