'use strict';

describe('Filter: reverse', function () {

  // load the filter's module
  beforeEach(module('dynomite2App'));

  // initialize a new instance of the filter before each test
  var reverse;
  beforeEach(inject(function ($filter) {
    reverse = $filter('reverse');
  }));

  it('should return the input prefixed with "reverse filter:"', function () {
    var text = 'angularjs';
    expect(reverse(text)).toBe('reverse filter: ' + text);
  });

});
