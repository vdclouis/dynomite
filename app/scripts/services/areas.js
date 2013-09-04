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
        //var getAreasCache = areasCache.get('allAreas');
        //if( typeof getAreasCache === 'undefined' ){
        // Get all Areas
          $http.get('/api/v1/areas')
          .success(function(data) {
            //console.log('GETAREA');
            defer.resolve(data);
            //areasCache.put('allAreas', data);
          })
          .error(function(response) {
            defer.resolve(response);
          });
        //} else {
        //  defer.resolve(getAreasCache);
        //}
        return defer.promise;
      }
      , addArea: function(data) {
        var defer = $q.defer();
        $http.post('/api/v1/areas', data)
        .success(function(data) {
          defer.resolve(data);
          areasCache.removeAll();
        })
        .error(function(response) {
          defer.resolve(response);
        });
        return defer.promise;
      }
      , deleteArea: function(areaId) {
        var defer = $q.defer();
        $http.delete('/api/v1/areas/' + areaId)
        .success(function(data) {
          console.log(data);
          defer.resolve(data);
          console.log(areasCache);
          areasCache.removeAll();
        })
        .error(function(response) {
          defer.resolve(response);
        });
        return defer.promise;
      }
      , areaById: function(id) {
        var defer = $q.defer();
        $http.get('/api/v1/areas/userid/' + id)
        .success(function(data) {
          console.log(data);
          defer.resolve(data);
        })
        .error(function(response) {
          defer.resolve(response);
        });
        return defer.promise;
      }
    };
  }])
;