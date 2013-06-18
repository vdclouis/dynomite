'use strict';

describe('Controller: AreaAddCtrl', function () {

  // load the controller's module
  beforeEach(module('dynomiteApp'));

  var AreaAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AreaAddCtrl = $controller('AreaAddCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
