'use strict';

describe('Service: routeCache', function () {

  // load the service's module
  beforeEach(module('dynomiteApp'));

  // instantiate service
  var routeCache;
  beforeEach(inject(function (_routeCache_) {
    routeCache = _routeCache_;
  }));

  it('should do something', function () {
    expect(!!routeCache).toBe(true);
  });

});
