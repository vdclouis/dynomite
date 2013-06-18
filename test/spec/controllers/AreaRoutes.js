'use strict';

describe('Controller: AreaRoutesCtrl', function () {

  // load the controller's module
  beforeEach(module('dynomiteApp'));

  var AreaRoutesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AreaRoutesCtrl = $controller('AreaRoutesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
