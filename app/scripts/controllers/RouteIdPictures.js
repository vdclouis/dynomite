'use strict';

angular.module('dynomiteApp')
  .controller('RouteIdPicturesCtrl', ['$scope', '$routeParams', 'Routes', '$log', 'routeCache', function($scope, $routeParams, Routes, $log, routeCache) {
    if( typeof routeCache.get('thisRoute') === 'undefined' ){
      Routes.routeById().get({name: $routeParams.routeId}, function(route) {
        console.log(route);
        $scope.route = route;
      });
    } else {
      $scope.route = routeCache.get('thisRoute');
    }
  }])