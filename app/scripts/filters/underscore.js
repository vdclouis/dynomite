'use strict';

angular.module('dynomiteApp')
  .filter('underscore', function () {
    return function(text) {
      return String(text).replace(/-/g,'_');
    }
  });
