'use strict';

var apikey = 'zmU_BDz4u4CsCpTltEbxOlPazJOFZtPE';

angular.module('dynomiteApp')
  .factory('routeCache', function($cacheFactory) {
    return $cacheFactory('routeCache', {capacity:1})
  });