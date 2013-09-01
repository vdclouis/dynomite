'use strict';

describe('Directive: swipe', function () {

  // load the directive's module
  beforeEach(module('dynomiteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<swipe></swipe>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the swipe directive');
  }));
});
