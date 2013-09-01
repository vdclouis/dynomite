'use strict';

var AreaCtrl = angular.module('dynomiteApp')
  .controller('AreaCtrl', ['$scope', '$route', function($scope, $route) {

    var data = $route.current.locals.areas;
    $scope.areas = data
    
    // Google maps
    google.maps.visualRefresh = true;
    $scope.center = {
      latitude: 33,
      longitude: 3.7
    };
    $scope.zoom = 8;
    $scope.markers = [];
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
    //populate the makers
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
  }]);

AreaCtrl.loadAreas = function($q, AreasService) {
  var defer = $q.defer();
  AreasService.allAreas()
  .then(function(data){
    //if(data){
      defer.resolve(data);
    /*}else{
      defer.reject(data);
    }*/
  });
  return defer.promise;
}