'use strict';

angular.module('dynomiteApp')
  //
  .factory('areasCache', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('areasCache', {
      capacity: 5
    });
  }])
  //
  .service('AreasService', ['$q', '$http', 'areasCache', function($q, $http, areasCache) {
    return{
      allAreas: function() {
        var defer = $q.defer();
        var getAreasCache = areasCache.get('allAreas');
        if( typeof getAreasCache === 'undefined' ){
        // Get all Areas
          $http.get('/api/v1/areas')
          .success(function(data) {
            defer.resolve(data);
            areasCache.put('allAreas', data);
          })
          .error(function(response) {
            defer.resolve(response);
          });
        } else {
          defer.resolve(getAreasCache);
        }
        return defer.promise;
      }
    };
  }])
;