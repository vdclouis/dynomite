'use strict';

describe('Controller: AreaEditCtrl', function () {

  // load the controller's module
  beforeEach(module('dynomiteApp'));

  var AreaEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AreaEditCtrl = $controller('AreaEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
