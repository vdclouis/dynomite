angular.module('Dynomite.services', ['ngResource'])
  .value('version', '0.1')
  .factory('Areas', function($resource) {
    return $resource('areas/areas.json')
  });