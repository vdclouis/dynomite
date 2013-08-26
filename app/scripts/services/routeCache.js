'use strict';

angular.module('dynomiteApp')
  .factory('routeCache', function($cacheFactory) {
    return $cacheFactory('routeCache', {
      capacity:5
    });
  });