'use strict';

angular.module('dynomiteApp')
  .directive('swipe', function ($timeout) {
    return {
      // Restrict it to be an attribute
      restrict: 'A',
      // responsible for registering DOM listeners as well as updating the DOM
      link: function (scope, element, attrs) {
        $timeout(function() {
          $(element).Swipe(scope.$eval(attrs.swipe))
        }, 100);
      }
    };
  });
