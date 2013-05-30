/* Controllers */

angular.module('Dynomite.controllers', [])
  .controller('HomeCtrl', ['$scope', '$filter', 'Weather', function($scope, $filter, Weather) {
    $scope.weather = Weather.get(function(data) {
      //inject filters
      var uppercaseFilter = $filter('uppercase');
      var underscoreFilter = $filter('underscore');
      
      //apply filters
      var icon = underscoreFilter(uppercaseFilter(data.currently.icon));
      
      //initiate skycons
      var skycons = new Skycons({"color": "#a0a0a0"});
      skycons.add('ico', Skycons[icon]);
      skycons.play();
    });
  }])
  .controller('AreaCtrl', ['$scope', 'Areas', function($scope, Areas) {
    //get all areas
    $scope.areas = Areas.query();
    
    //leaflet directive
    angular.extend($scope, {
      center: {
        lat: 51.0500,
        lng: 3.7167,
        zoom: 4
      },
      markers: {
        Madrid: {
          lat: 40.095,
          lng: -3.823,
          message: "Drag me to your position",
          focus: true,
          draggable: true
        }
      }
    });
    
    //default order
    $scope.orderAreas = 'name';
  }])
  .controller('AreaAddCtrl', ['$scope', '$location', 'Areas', function($scope, $location, Areas){
    $scope.save = function() {
      Areas.save($scope.area, function(area) {
        $location.path('/area/edit/' + area._id.$oid);
      });
    }
  }])
  .controller('AreaEditCtrl', ['$scope', '$location', '$routeParams', 'Areas', function($scope, $location, $routeParams, Areas) {
   var self = this;
   
   Areas.get({id: $routeParams.areaId}, function(area) {
     self.original = area;
     $scope.area = new Areas(self.original);
   });
   
   $scope.isClean = function() {
     return angular.equals(self.original, $scope.area)
   }
   
   $scope.destroy = function() {
     self.original.destroy(function() {
       $location.path('/area');
     });
   };
   
   $scope.save = function() {
     $scope.area.update(function() {
       $location.path('/area');
     })
   }
  }])
  .controller('RouteIdCtrl', ['$scope', '$routeParams', 'Routes', function($scope, $routeParams, Routes) {
    $scope.route = Routes.routeById($routeParams.id).get();
  }])
  .controller('RouteIdPicturesCtrl', [function() {
  }])
  .controller('RouteIdEditCtrl', ['$scope', '$routeParams', 'Routes', function($scope, $routeParams, Routes) {
    console.log('edit route');
  }])
  .controller('RouteIdDeleteCtrl', [function() {
  }])
  .controller('RouteAddCtrl', [function() {
  }])
  .controller('UserCtrl', [function() {
  }])
  .controller('UserIdCtrl', [function() {
  }])
  .controller('UserIdEditCtrl', [function() {
  }])
  .controller('LoginCtrl', [function() {
  }])
  .controller('RegisterCtrl', [function() {
  }]);