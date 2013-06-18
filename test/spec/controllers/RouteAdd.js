'use strict';

describe('Controller: RouteAddCtrl', function () {

  // load the controller's module
  beforeEach(module('dynomiteApp'));

  var RouteAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RouteAddCtrl = $controller('RouteAddCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
