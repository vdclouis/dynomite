'use strict';

describe('Filter: test', function () {

  // load the filter's module
  beforeEach(module('dynomite2App'));

  // initialize a new instance of the filter before each test
  var test;
  beforeEach(inject(function ($filter) {
    test = $filter('test');
  }));

  it('should return the input prefixed with "test filter:"', function () {
    var text = 'angularjs';
    expect(test(text)).toBe('test filter: ' + text);
  });

});
