'use strict';

angular.module('dynomiteApp')
  .controller('RouteIdCtrl', ['$scope', '$routeParams', 'Routes', '$log', 'routeCache', function($scope, $routeParams, Routes, $log, routeCache) {
    Routes.routeById().get({name: $routeParams.routeId}, function(route) {
      console.log(route);
      $scope.route = route;
      routeCache.put('thisRoute', route); 
    });
  }])