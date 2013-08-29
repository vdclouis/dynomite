'use strict';

angular.module('dynomiteApp')
  .controller('HomeCtrl', function($scope, $filter, Weather, Global) {
    // Call the global factory, this gets the user information
    $scope.global = Global;

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.lat = pos.coords.latitude;
      $scope.lon = pos.coords.longitude;

      $scope.weather = Weather.get({lat: $scope.lat, lon: $scope.lon}, function(data) {
        // Inject filters
        var uppercaseFilter = $filter('uppercase');
        var underscoreFilter = $filter('underscore');

        // Apply filters
        var icon = underscoreFilter(uppercaseFilter(data.currently.icon));

        // Initiate skycons
        var skycons = new Skycons({'color': '#a0a0a0'});
        skycons.add('ico', Skycons[icon]);
        skycons.play();
      }); // eo weather
    });
  });

