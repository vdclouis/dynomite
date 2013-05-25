angular.module('Dynomite.services', ['ngResource'])
  .value('version', '0.1')
  .factory('Areas', function($resource) {
    return $resource(
      'areas/areas.json',
      {},
      {
        allUsers: {method:'GET', params:{}, isArray:true}
      }
    );
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