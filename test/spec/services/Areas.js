'use strict';

describe('Service: Areas', function () {

  // load the service's module
  beforeEach(module('dynomiteApp'));

  // instantiate service
  var Areas;
  beforeEach(inject(function (_Areas_) {
    Areas = _Areas_;
  }));

  it('should do something', function () {
    expect(!!Areas).toBe(true);
  });

});
