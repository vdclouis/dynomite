'use strict';

angular.module('dynomiteApp')
  .controller('AreaCtrl', ['$scope', '$http', function($scope, $http) {

    // Get all Areas
    $http.get('/api/v1/areas')
      .success(function(data) {
        console.log('yay');
        $scope.findMe();
        for (var i=0; i<data.length; i++) {
          var lat = data[i].lat;
          var lng = data[i].lng;
          $scope.markers.push({
            latitude: lat,
            longitude: lng
          });
        }
        $scope.areas = data;
      })
      .error(function() {
        console.log('nay');
      });

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
    $scope.findMe = function() {
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
    };

    // Default order
    $scope.orderAreas = 'name';
  }]);