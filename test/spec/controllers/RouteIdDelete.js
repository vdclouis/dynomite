'use strict';

describe('Controller: RouteIdDeleteCtrl', function () {

  // load the controller's module
  beforeEach(module('dynomiteApp'));

  var RouteIdDeleteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RouteIdDeleteCtrl = $controller('RouteIdDeleteCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
