'use strict';

var app = angular.module('dynomiteApp');

app.controller('AreaCtrl', ['$scope', '$route', 'Auth', 'AreasService', function($scope, $route, Auth, AreasService) {

  $scope.accessLevels = Auth.accessLevels;

  /*
    console.log('AREACONTROLLER');
    var data = $route.current.locals.areas;
    console.log(data);
    $scope.areas = data;
  */

  //init the map
  $scope.center = {
    latitude: 33,
    longitude: 3.7
  };
  $scope.zoom = 8;
  $scope.markers = [];

  AreasService.allAreas()
  .then(function(data) {
    $scope.areas = data;
    //console.log(data);

  //get pos
  $scope.geolocationAvailable = navigator.geolocation ? true : false;

  // Get current location
  if( $scope.geolocationAvailable ) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.center = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      $scope.$apply();
    }, function() {

    });
  }

  //new array for the markers
  $scope.markers = [];
  //populate the markers
  for (var i=0; i<data.length; i++) {
    var lat = data[i].lat;
    var lng = data[i].lng;
    $scope.markers.push({
      latitude: lat,
      longitude: lng
    });
  }

  // Default order
  $scope.orderAreas = 'name';

  });

}]);

app.factory('loadAreas', ['$q', 'AreasService', function($q, AreasService) {
  var defer = $q.defer();
  AreasService.allAreas()
  .then(function(data){
    //if(data){
    defer.resolve(data);
    /*}else{
      defer.reject(data);
    }*/
  });
  return (defer.promise);
}]);