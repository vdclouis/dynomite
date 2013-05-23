angular.module('Dynomite.filters', [])
  .filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }])
  .filter('reverse', function() {
    return function(text) {
      return text.split('').reverse().join('');
    }
  });