angular.module('track.services', [])

.factory('userData', function ($http, $location) {
  var storage = {};

  var getData = function () {
    window.user = prompt('Username: ');
    return $http({
      method: 'GET',
      url: '/user/' + window.user,
    })
    .then(function (data) {
      storage.data = data.data;
      console.log(storage.data);
    });
  };


  return {
    getData: getData,
    storage: storage
  };
});