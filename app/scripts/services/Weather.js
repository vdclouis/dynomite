'use strict';

angular.module('dynomiteApp')
  .factory('Weather', function($resource) {
    var Resource = $resource('https://api.forecast.io/forecast/:apikey/:lat,:lon',
      {
        callback:'JSON_CALLBACK',
        units: 'si',
        lat: '@lat',
        lon: '@lon',
        apikey: '4c327a918629278ca227b67846a110f3'
      },
      {
        get: {method:'JSONP', params:{ isArray: true }}
      }
    );
    
    return Resource;
  })