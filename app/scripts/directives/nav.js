'use strict';

angular.module('dynomiteApp')
  .directive('back', function () {
    return {
      restrict: 'E',
      template: '<a href="" class="pull-left backarrow"><span class="glyphicon glyphicon-arrow-left"></span></a>',
      link: function(scope, element, attrs) {
        //console.log(scope);
        //console.log(element);
        //console.log(attrs);
        element.bind('click', function() {

          history.back();
          scope.$apply();
        });
      }
    };
  });
