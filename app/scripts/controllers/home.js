'use strict';

angular.module('dynomiteApp')
  .controller('HomeCtrl', ['$scope', '$rootScope', '$filter', 'Weather', 'Auth', function($scope, $rootScope, $filter, Weather, Auth) {

    $scope.accessLevels = Auth.accessLevels;
    
    // Get current location
    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.lat = pos.coords.latitude;
      $scope.lon = pos.coords.longitude;
      $scope.accessLevels = Auth.accessLevels;

      $scope.weather = Weather.get({lat: $scope.lat, lon: $scope.lon}, function(data) {
        // Inject filters
        var uppercaseFilter = $filter('uppercase');
        var underscoreFilter = $filter('underscore');

        // Apply filters
        var icon = underscoreFilter(uppercaseFilter(data.currently.icon));

        // Initiate skycons
        var skycons = new Skycons({'color': '#a0a0a0'});

        // add a canvas by id
        skycons.add('ico', Skycons[icon]);

        // start animation
        skycons.play();
      }); // eo weather
    });
  }]);