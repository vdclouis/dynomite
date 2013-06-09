/* Controllers */
angular.module('Dynomite.controllers', [])
  .controller('HomeCtrl', ['$scope', '$filter', 'Weather', function($scope, $filter, Weather) {

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.lat = pos.coords.latitude;
      $scope.lon = pos.coords.longitude;
      
      $scope.weather = Weather.get({lat: $scope.lat, lon: $scope.lon}, function(data) {
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
    });
  }])
  .controller('AboutCtrl', ['$scope', function($scope) {

  }])
  .controller('GradesCtrl', ['$scope', function($scope) {

  }])
  .controller('AreaCtrl', ['$scope', 'Areas', function($scope, Areas) {
    $scope.areas = Areas.allAreas().query({}, function(data) {
      console.log(data);
      $scope.findMe();
      
      for (var i=0; i<data.length; i++) {
        var lat = data[i].coord.lat;
        var lon = data[i].coord.lon;
        
        $scope.markers.push({
          latitude: lat,
          longitude: lon
        });
      }
    });
    
    //gmap
    google.maps.visualRefresh = true;
    
    $scope.center = {
      latitude: 33,
      longitude: 3.7
    };
    $scope.zoom = 8;
    
    $scope.markers = [];
    
    //get pos
    $scope.geolocationAvailable = navigator.geolocation ? true : false;
    $scope.findMe = function() {
      if( $scope.geolocationAvailable ) {
        navigator.geolocation.getCurrentPosition(function(position) {
          $scope.center = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          $scope.$apply();
        }, function() {

        });
      }
    };
    
    //default order
    $scope.orderAreas = 'name';
  }])
  .controller('AreaAddCtrl', ['$scope', '$location', 'Areas', function($scope, $location, Areas){
    
    $scope.save = function() {
      Areas.getArea().save($scope.area, function(area) {
        $location.path('/area');
      });
    };
    
    console.log($scope.save);
    
    $scope.locateMe = function() {
      navigator.geolocation.getCurrentPosition(function(position) {
        $scope.area.coord.lat = position.coords.latitude;
        $scope.area.coord.lon = position.coords.longitude;
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

  }])
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
  }])
  .controller('AreaRoutesCtrl', ['$scope', '$routeParams', 'Routes', 'Areas', function($scope, $routeParams, Routes, Areas) {
    // get areaname
    Areas.getArea().query({id: $routeParams.name}, function(area) {
      console.log(area);
      $scope.area = area['0'];
    });
    
    // get routes with x areaname
    $scope.routes = Routes.getR().query({areaName: $routeParams.name});
    
    // Swipejs
    window.mySwipe = new Swipe(document.getElementById('mySwipe'), {
      auto: 3000,
      continuous: true
    });
    
    //default order
    $scope.orderRoutes = 'name';
  }])
  .controller('RouteIdCtrl', ['$scope', '$routeParams', 'Routes', '$log', 'routeCache', function($scope, $routeParams, Routes, $log, routeCache) {
    Routes.routeById().get({name: $routeParams.routeId}, function(route) {
      console.log(route);
      $scope.route = route;
      routeCache.put('thisRoute', route);
    });
  }])
  .controller('RouteIdPicturesCtrl', ['$scope', '$routeParams', 'Routes', '$log', 'routeCache', '$timeout', function($scope, $routeParams, Routes, $log, routeCache, $timeout) {
    if( typeof routeCache.get('thisRoute') === 'undefined' ){
      Routes.routeById().get({name: $routeParams.routeId}, function(route) {
        console.log(route);
        $scope.route = route;
      });
    } else {
      $scope.route = routeCache.get('thisRoute');
    }
    $scope.elements = [
      { 'title': 'start', 'drag': true },
      { 'title': 'end', 'drag': true },
      { 'title': 'grip', 'drag': true },
      { 'title': 'move', 'drag': true },
      { 'title': 'dyno', 'drag': true }
    ];
    $scope.startCallback = function(event, ui) {
      console.log('You started draggin');
    };

    $scope.stopCallback = function(event, ui) {
      console.log('Why did you stop draggin me?');
    };

    $scope.dragCallback = function(event, ui) {
      console.log('hey, look I`m flying');
    };

    $scope.dropCallback = function(event, ui) {
      console.log('hey, you dumped me :-(');
    };

    $scope.overCallback = function(event, ui) {
      console.log('Look, I`m over you');
    };

    $scope.outCallback = function(event, ui) {
      console.log('I`m not, hehe');
    };
  }])
  .controller('RouteIdEditCtrl', ['$scope', '$location', '$routeParams', 'RouteEdit', 'Areas', function($scope, $location, $routeParams, RouteEdit, Areas) {
    Areas.allAreas().query({}, function (data){
      data[0]['areaName'] = $routeParams.area;
      console.log(data);
      $scope.areas = data;
    });

    var self = this;

    RouteEdit.get({id: $routeParams.routeId}, function(route) {
      self.original = route;
      $scope.route = new RouteEdit(self.original);
    });

    $scope.isClean = function() {
      return angular.equals(self.original, $scope.route);
    };

    $scope.destroy = function() {
      self.original.destroy(function() {
	$location.path('/area');
      });
    };

    $scope.save = function() {
      $scope.route.update(function() {
	$location.path('/area');
      });
    };
  }])
  .controller('RouteIdDeleteCtrl', [function() {
  }])
  .controller('RouteAddCtrl', ['$scope', '$routeParams', 'Routes', 'Areas', function($scope, $routeParams, Routes, Areas) {

    //get areaName from current area for the dropdown
    Areas.allAreas().query({}, function (data){
      data[0]['areaName'] = $routeParams.area;
      console.log(data);
      $scope.areas = data;
    });

    $scope.save = function() {
      Routes.routeById().save($scope.route, function(route) {
        $location.path('/area/' + $routeParams.area);
      });
    };
  }]);