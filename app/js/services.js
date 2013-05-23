angular.module('Dynomite.services', ['ngResource'])
  .value('version', '0.1')
  .factory('Areas', function($resource) {

    /*query() {} = function() {

      return 
    }*/

    return $resource(
      'areas/areas.json',
      {}, 
      {
        allUsers: {method:'GET', params:{}, isArray:true}
      }
    )
  });