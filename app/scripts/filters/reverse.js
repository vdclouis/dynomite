'use strict';

angular.module('dynomiteApp')
  .filter('reverse', function () {
    return function(text) {
      return text.split('').reverse().join('');
    }
  });
