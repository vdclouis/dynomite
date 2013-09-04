'use strict';

angular.module('dynomiteApp')
  .controller('RouteCtrl', ['$scope', '$routeParams', '$http', 'Auth', function($scope, $routeParams, $http, Auth) {

    $scope.accessLevels = Auth.accessLevels;

    // Get unique route
    $http.get('/api/v1/routes/' + $routeParams.routeId)
      .success(function(data) {
        console.log('yay');

        $scope.route = data;

        $scope.markers = [];
        //get pos
        $scope.geolocationAvailable = navigator.geolocation ? true : false;

        // Get current location
        if( $scope.geolocationAvailable ) {
          navigator.geolocation.getCurrentPosition(function(position) {
            // Set new center based on current pos
            $scope.center = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            $scope.$apply();
          }, function() {

          });
        }

        $scope.markers = [];

        var lat = data.lat;
        var lng = data.lng;
        $scope.markers.push({
          latitude: lat,
          longitude: lng
        });
      })
      .error(function() {
        console.log('nay');
      });

    // Get comments
    $http.get('/api/v1/commentz/' + $routeParams.routeId)
      .success(function(data) {
        console.log('yay');
        $scope.comments = data;
      })
      .error(function() {
        console.log('nay');
      });

    // init gmap
    google.maps.visualRefresh = true;

    // temp center
    $scope.center = {
      latitude: 33,
      longitude: 3.7
    };

    $scope.zoom = 8;
  }]);