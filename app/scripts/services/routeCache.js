'use strict';

angular.module('dynomiteApp')
  .factory('routeCache', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('routeCache', {
      capacity:5
    });
  }]);