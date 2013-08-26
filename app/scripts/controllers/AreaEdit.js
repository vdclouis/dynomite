'use strict';

angular.module('dynomiteApp')
  .controller('AreaEditCtrl', ['$scope', '$location', '$routeParams', 'AreaEdit', function($scope, $location, $routeParams, AreaEdit) {
    var self = this;

    AreaEdit.get({id: $routeParams.areaId}, function(area) {
      self.original = area;
      $scope.area = new AreaEdit(self.original);
    });

    $scope.isClean = function() {
      return angular.equals(self.original, $scope.area);
    };

    $scope.destroy = function() {
      self.original.destroy(function() {
        $location.path('/area');
      });
    };

    $scope.save = function() {
      $scope.area.update(function() {
        $location.path('/area');
      });
    };

    filepicker.setKey('Aw1KqJloRli2yInj47Sthz');

    $scope.uploadFile = function() {
      filepicker.pick(function(FPFile){
        console.log(FPFile.url);
        $scope.area.img = FPFile.url;
        $scope.$apply();
      });
    };
  }]);