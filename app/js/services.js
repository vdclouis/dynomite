angular.module('Dynomite.services', ['ngResource'])
  .value('version', '0.1')
  .factory('Areas', function($resource) {
    //http://docs.angularjs.org/api/ngResource.$resource#Returns

    return {
      allAreas: function() {
        return $resource(
          'database/areas.json',
          {},
          {
            //query: {method:'GET', params:{}, isArray:true},
            //areaById: {method:'GET', params:{}, isArray:true},
          }
        )
      },
      areaById: function(_id) {
        return $resource(
          'database/area:id.json',
          {id: _id},
          {
            //query: {method:'GET', params:{}, isArray:true},
            //areaById: {method:'GET', params:{}, isArray:true},
          }
        )
      }
    }
  })
  .factory('Routes', function($resource) {
    return {
      allRoutes: function() {
        return $resource(
          'database/routes.json',
          {},
          {
            //query: {method:'GET', params:{}, isArray:true},
            //areaById: {method:'GET', params:{}, isArray:true},
          }
        )
      },
      routeById: function(_id) {
        return $resource(
          'database/route:id.json',
          {id: _id},
          {
            //getId: {method:'GET', params:{}, isArray:false},
            //areaById: {method:'GET', params:{}, isArray:true},
          }
        )
      }
    }
  })
  .factory('Weather', function($resource) {
    var resource = $resource('https://api.forecast.io/forecast/4c327a918629278ca227b67846a110f3/37.8267,-122.423',
    { 
      callback:'JSON_CALLBACK'
    },
    {
      get: {method:'JSONP'}
    }
    );
    return resource;
  });