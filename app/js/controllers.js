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
      //console.log(data);
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
    
    filepicker.setKey('Aw1KqJloRli2yInj47Sthz');

    $scope.uploadFile = function() {
      filepicker.pick(function(FPFile){
        console.log(FPFile.url);
        $scope.area.img = FPFile.url;
        $scope.$apply();
      });
    };
  }])
  .controller('AreaRoutesCtrl', ['$scope', '$routeParams', 'Routes', 'Areas', function($scope, $routeParams, Routes, Areas) {
    // get areaname
    Areas.getArea().query({id: $routeParams.name}, function(area) {
      //console.log(area);
      $scope.area = area['0'];
    });
    
    // get routes with x areaname
    $scope.routes = Routes.getR().query({areaName: $routeParams.name});
    
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
  .controller('RouteIdPicturesCtrl', ['$scope', '$routeParams', 'Routes', '$log', 'routeCache', function($scope, $routeParams, Routes, $log, routeCache) {
    if( typeof routeCache.get('thisRoute') === 'undefined' ){
      Routes.routeById().get({name: $routeParams.routeId}, function(route) {
        console.log(route);
        $scope.route = route;
      });
    } else {
      $scope.route = routeCache.get('thisRoute');
    }

  }])
  .controller('RouteIdEditCtrl', ['$scope', '$location', '$routeParams', 'RouteEdit', 'Areas', function($scope, $location, $routeParams, RouteEdit, Areas) {
    Areas.allAreas().query({}, function (data){
      //console.log(data);
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
    
    filepicker.setKey('Aw1KqJloRli2yInj47Sthz');

    $scope.uploadFile = function() {
      filepicker.pick(function(FPFile){
        console.log(FPFile.url);
        $scope.area.img = FPFile.url;
        $scope.$apply();
      });
    };
  }])
  .controller('RouteIdDeleteCtrl', [function() {
  }])
  .controller('RouteAddCtrl', ['$scope', '$location', '$routeParams', 'RouteEdit', 'Areas', function($scope, $location, $routeParams, RouteEdit, Areas) {

    //get areaName from current area for the dropdown
    Areas.allAreas().query({}, function (data){
      console.log(data);
      $scope.areas = data;
    });

    $scope.save = function() {
      RouteEdit.save($scope.route, function(route) {
        $location.path('/route/' + route._id.$oid);
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
  .controller('canvasCtrl', ['$scope', '$location', '$routeParams', 'RouteEdit', 'Routes', function($scope, $location, $routeParams, RouteEdit, Routes) {

    var self = this;

    RouteEdit.get({id: $routeParams.routeId}, function(route) {
      self.original = route;
      $scope.route = new RouteEdit(self.original);
      for (var i = 0 ; i <= $scope.route.overlay.length; i++) {
        
        var cc = new newCircle(itemName, '25', '25', '50', '50');

        layer.add(cc);
        layer.draw();

        /*startCircleGroup.on('touchmove dragend', function(e) {
          overlay[this.attrs.id] = {
            x: this.getPosition().x,
            y: this.getPosition().y
          }
          console.log(overlay);
          var touchPos = stage.getTouchPosition();
          //var x = touchPos.x - 190;
          //var y = touchPos.y - 40;
          //writeMessage(messageLayer, 'x: ' + x + ', y: ' + y);
        });*/
      };
    });
    $scope.saveData = function(){
      $scope.route.overlay = overlay;
      $scope.route.update(function() {
        $location.path('/area');
      });
    };

    var overlay = [];

    $(window).on('resize',function(){
      if(this.resizeTO) clearTimeout(this.resizeTO);
      this.resizeTO = setTimeout(function(){
        $(this).trigger('resizeEnd');
      },500);
    });

    $(window).on('resizeEnd orientationchange',function(){
      console.log('resizing');
      $('#container').empty();
      RunHeaderAnim();
    });

    var droparea = $('#droparea');
    var wallImage = $("#wallImage[0]");
    console.log(droparea);
    console.log(wallImage);

    function RunHeaderAnim() {
      stage.setWidth(window.innerWidth);
      stage.setHeight(window.innerHeight-90);
      stage.draw();
      console.log(stage.getWidth());
      console.log(stage.getHeight());

      var rectHeigth = 50;
      var rectWidth = 50;
      var minX=stage.getX()+25;
      var maxX=stage.getX()+stage.getWidth()-25;
      var minY=stage.getY()+25;
      var maxY=stage.getY()+stage.getHeight()-25;
      
      startCircleGroup = {
        dragBoundFunc: function(pos) {
          var X=pos.x;
          var Y=pos.y;
          if(X<minX){X=minX;};
          if(X>maxX){X=maxX;};
          if(Y<minY){Y=minY;};
          if(Y>maxY){Y=maxY;};
          return({x:X, y:Y});
        }
      }
    }

    var stage = new Kinetic.Stage({
        container : "droparea",
        width : window.innerWidth,
        height : window.innerHeight-90,
    });
    var layer = new Kinetic.Layer();
    stage.add(layer);

    console.log(stage.getWidth());
    console.log(stage.getHeight());

    var dragSrcEl = null;
    document.getElementById("start").addEventListener('dragstart', function(e){
      dragSrcEl = this;
    });

    document.getElementById("end").addEventListener('dragstart', function(e){
      dragSrcEl = this;
    });

    var con = stage.getContainer(); 

    con.addEventListener('dragover',function(e){
      e.preventDefault(); //@important
    });

    var newCircle = function(name, xval, yval, width, heigth){
      this.thisName = name;
      this.thisx = xval;
      this.thisy = yval;
      this.thisWidth = width;
      this.thisHeigth = heigth;

      var minX=stage.getX()+this.width/2;
      var maxX=stage.getX()+stage.getWidth()-this.width/2;
      var minY=stage.getY()+this.heigth/2;
      var maxY=stage.getY()+stage.getHeight()-this.heigth/2;

      var startCircleGroup = new Kinetic.Group({
        id: this.thisName,
        x:25,
        y:25,
        draggable:true,
        dragBoundFunc: function(pos) {
          var X=pos.x;
          var Y=pos.y;
          if(X<minX){X=minX;};
          if(X>maxX){X=maxX;};
          if(Y<minY){Y=minY;};
          if(Y>maxY){Y=maxY;};
          return({x:X, y:Y});
        },
      });
      console.log(startCircleGroup);

      var startCircle = new Kinetic.Circle({
        radius: 25,
        stroke: 'red',
        strokeWidth: 2,
        id: 'circle'
      });
      startCircleGroup.add(startCircle);

      startCircleGroup.on('touchmove dragend', function(e) {
        console.log(this.getPosition().x);
        console.log(this.getPosition().y);
        startCircleGroup = {
          x: this.getPosition().x,
          y: this.getPosition().y
        }
        console.log(overlay);
        var touchPos = stage.getTouchPosition();
      });

      return startCircleGroup;
    }

    //insert image to stage
    con.addEventListener('drop',function(e){
      var itemName = layer.children.length;

      var cc = new newCircle(itemName, '25', '25', '50', '50');
      //console.log(cc);
      overlay.push(cc);
      console.log(overlay);

      layer.add(cc);
      layer.draw();

      /*switch(dragSrcEl.id){
        case 'start':
          console.log('startobj');

          var startGroup = new Kinetic.Group({
            //draggable : true,
            x: 0,
            y: 0,
          });
          //startCircleGroup.add(removeLabel);
          //startGroup.add(startCircleGroup);
          //startGroup.add(simpleLabel);
          //layer.add(startGroup);


          

          layer.add(cc);

          layer.draw();

        break;
        case 'end':
          var image = new Kinetic.Image({
            draggable : true,
            //x: e.clientX/2,
            //y: e.clientY/2
          });
          layer.add(image);
          imageObj = new Image();
          imageObj.src = dragSrcEl.src;
          imageObj.onload = function(){
            image.setImage(imageObj);
            layer.draw();
            console.log(layer);
            console.log(elements);
          };        
        break;
      };*/
    });

  }]);