'use strict';

describe('Service: AreasEdit', function () {

  // load the service's module
  beforeEach(module('dynomiteApp'));

  // instantiate service
  var AreasEdit;
  beforeEach(inject(function (_AreasEdit_) {
    AreasEdit = _AreasEdit_;
  }));

  it('should do something', function () {
    expect(!!AreasEdit).toBe(true);
  });

});
