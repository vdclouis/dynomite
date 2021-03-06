'use strict';

describe('Controller: GradesCtrl', function () {

  // load the controller's module
  beforeEach(module('dynomiteApp'));

  var GradesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GradesCtrl = $controller('GradesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
