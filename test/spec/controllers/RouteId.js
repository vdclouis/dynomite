'use strict';

describe('Controller: RouteIdCtrl', function () {

  // load the controller's module
  beforeEach(module('dynomiteApp'));

  var RouteIdCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RouteIdCtrl = $controller('RouteIdCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
