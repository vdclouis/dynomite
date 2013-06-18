'use strict';

describe('Controller: RouteIdPicturesCtrl', function () {

  // load the controller's module
  beforeEach(module('dynomiteApp'));

  var RouteIdPicturesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RouteIdPicturesCtrl = $controller('RouteIdPicturesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
