'use strict';

describe('Service: RoutesEdit', function () {

  // load the service's module
  beforeEach(module('dynomiteApp'));

  // instantiate service
  var RoutesEdit;
  beforeEach(inject(function (_RoutesEdit_) {
    RoutesEdit = _RoutesEdit_;
  }));

  it('should do something', function () {
    expect(!!RoutesEdit).toBe(true);
  });

});
