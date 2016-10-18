angular.module('track.services', [])

.factory('userData', function ($http, $location) {
  var storage = {};

  var getData = function () {
    window.user = prompt('Username: ');
    return $http({
      method: 'GET',
      url: '/user/' + storage.user,
    })
    .then(function (data) {
      console.log(data);
      storage.data = data;
    });
  };


  return {
    getData: getData,
    storage: storage
  };
});