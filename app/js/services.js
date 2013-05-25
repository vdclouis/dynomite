angular.module('Dynomite.services', ['ngResource'])
  .value('version', '0.1')
  .factory('Areas', function($resource) {

    //http://docs.angularjs.org/api/ngResource.$resource#Returns
    return $resource(
      'areas/areas.json',
      {}, 
      {
        query: {method:'GET', params:{}, isArray:true},
      }
    )
  })
  .factory('Routes', function($resource) {

    return $resource(
      'areas/routes.json',
      {}, 
      {
        query: {method:'GET', params:{}, isArray:true},
      }
    )
  })
  ;