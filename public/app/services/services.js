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
    return $http({
      method: 'GET',
      url: '/api/user',
    })
    .then(function (res) {
      return makeUnique(res.data);
    });
  };

  var getLiftData = function (liftName, callback) {
    return $http({
      method: 'GET',
      url: '/api/' + liftName,
    })
    .then(function (data) {
      callback(data.data);
    });
  };

  function makeUnique (array) {
    return array.reduce((acc, ele) => {
      if (acc.indexOf(ele.lift) === -1) {
        acc.push(ele.lift);
      }
      return acc;
    }, []);
  }

  return {
    getData: getData,
    getLiftData: getLiftData,
    filterLifts: filterLifts,
    storage: storage
  };
})

.factory('Auth', function ($http, $location, $window, userData) {
  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/signup',
      data: user
    }).success(function (data) {
      localStorage.setItem('token', data.token);
      $location.path('/');
    });
  };

  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/signin',
      data: user
    }).success(function (data) {
      localStorage.setItem('token', data.token);
      $location.path('/');
    });
  };

  var isAuth = function () {
    return !!localStorage.getItem('token');
  };

  var logout = function () {
    localStorage.removeItem('token');
    $location.path('/signin');
  };

  return {
    signup: signup,
    signin: signin,
    isAuth: isAuth,
    logout: logout
  };

});