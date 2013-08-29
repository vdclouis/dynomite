'use strict';

angular.module('dynomiteApp')
  .factory('currentUserCache', function($cacheFactory) {
    return $cacheFactory('currentUserCache', {
      capacity:1
    });
  });