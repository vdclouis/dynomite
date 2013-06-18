'use strict';

describe('Controller: RouteIdEditCtrl', function () {

  // load the controller's module
  beforeEach(module('dynomiteApp'));

  var RouteIdEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RouteIdEditCtrl = $controller('RouteIdEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
