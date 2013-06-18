'use strict';

describe('Service: Routes', function () {

  // load the service's module
  beforeEach(module('dynomiteApp'));

  // instantiate service
  var Routes;
  beforeEach(inject(function (_Routes_) {
    Routes = _Routes_;
  }));

  it('should do something', function () {
    expect(!!Routes).toBe(true);
  });

});
