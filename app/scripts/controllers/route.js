'use strict';

angular.module('dynomiteApp')
  .controller('RouteCtrl', ['$scope', '$routeParams', '$http', 'Auth', function($scope, $routeParams, $http, Auth) {

    $scope.accessLevels = Auth.accessLevels;

    // Get unique route
    $http.get('/api/v1/routes/' + $routeParams.routeId)
      .success(function(data) {
        console.log('yay');
        $scope.route = data;


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

    // Google maps
    google.maps.visualRefresh = true;

    $scope.center = {
      latitude: 30,
      longitude: 7
    };

    console.log('yay', $scope.route);

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
    /*for (var i=0; i<data.length; i++) {
      var lat = data[i].lat;
      var lng = data[i].lng;
      $scope.markers.push({
        latitude: lat,
        longitude: lng
      });
    }*/

  }]);