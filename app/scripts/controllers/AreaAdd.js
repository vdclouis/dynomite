'use strict';

angular.module('dynomiteApp')
  .controller('AreaAddCtrl', ['$scope', '$location', 'Areas', 'AreaEdit', function($scope, $location, Areas, AreaEdit){
    $scope.save = function() {
      Areas.getArea().save($scope.area, function(area) {
        $location.path('/area');
      });
    };
    $scope.area = new AreaEdit();
    $scope.locateMe = function() {
      navigator.geolocation.getCurrentPosition(function(position) {
        $scope.area.coord = { lat: position.coords.latitude, lon: position.coords.longitude };
        $scope.$apply();
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