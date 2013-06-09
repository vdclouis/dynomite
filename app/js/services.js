//mongolab API key
var apikey = 'zmU_BDz4u4CsCpTltEbxOlPazJOFZtPE';

angular.module('Dynomite.services', ['ngResource', 'ngDragDrop'])
  .value('version', '0.1')
  .factory('Areas', function($resource) {
    return{
      allAreas: function(){
        var Areas = $resource(
          'https://api.mongolab.com/api/1/databases/dynomite/collections/areas',
          {
            apiKey: apikey,
            //id: '@name'
          },
          {
            update: { method: 'PUT' }
          }
        );
        return Areas;
      },
      getArea: function(){
        var Areas = $resource(
          'https://api.mongolab.com/api/1/databases/dynomite/collections/areas?q={"name"\\:":id"}&apiKey=' + apikey,
          {
            id: '@name'
          },
          {
            update: { method: 'PUT' }
          }
        );
        //extending the resource class
        Areas.prototype.update = function(cb) {
          // action: {method:?, params:?, isArray:?}
          return Areas.update({id: this._id.$oid},
            //angular.extend(destination, source);
            angular.extend({}, this,  {_id:undefined}), cb);
        };
        //remove = default action, method = DELETE
        Areas.prototype.destroy = function(cb) {
          return Areas.remove({id: this._id.$oid}, cb);
        };

        return Areas;
      }
    };
  })
  .factory('AreaEdit', function($resource) {
    var AreaEdit = $resource(
      'https://api.mongolab.com/api/1/databases/dynomite/collections/areas/:id?apiKey=' + apikey,
      {},
      {
        update: { method: 'PUT' }
      }
    );

    AreaEdit.prototype.update = function(cb) {
      return AreaEdit.update(
	{ id: this._id.$oid },
	angular.extend({}, this, {_id:undefined}),
	cb
      );
    };

    AreaEdit.prototype.destroy = function(cb) {
      return AreaEdit.remove({id: this._id.$oid}, cb);
    };

    return AreaEdit;
  })
  .factory('Routes', function($resource) {
    return {
      getR: function (){
        var Routes = $resource(
          'https://api.mongolab.com/api/1/databases/dynomite/collections/routes?q={"areaName"\\:":areaName"}&apiKey=' + apikey,
          {
            areaName: '@areaName'
          },
          {
            update: { method: 'PUT' },
            get: { method: 'GET' }
          }
        );
        //console.log(Routes);
        Routes.prototype.update = function(cb) {
          return Routes.update({id: this._id.$oid},
          angular.extend({}, this, {_id:undefined}), cb);
        };
        Routes.prototype.destroy = function(cb) {
          return  Routes.remove({id: this._id.$oid}, cb);
        };
        return Routes;
      },
      routeById: function() {
        var Routes = $resource(
          'https://api.mongolab.com/api/1/databases/dynomite/collections/routes?q={"name"\\:":name"}&fo=true&apiKey=' + apikey,
          {
            name: '@name'
          },
          {
            update: { method: 'PUT' }
          }
        );
        Routes.prototype.update = function(cb) {
          return Routes.update({id: this._id.$oid},
          angular.extendq({}, this, {_id:undefined}), cb);
        };
        Routes.prototype.destroy = function(cb) {
          return Routes.remove({id: this._id.$oid}, cb);
        };
        return Routes;
      }
    };
  })
  .factory('RouteEdit', function($resource) {
    var RouteEdit = $resource(
      'https://api.mongolab.com/api/1/databases/dynomite/collections/routes/:id?apiKey=' + apikey,
      {},
      {
        update: { method: 'PUT' }
      }
    );

    RouteEdit.prototype.update = function(cb) {
      return RouteEdit.update(
        { id: this._id.$oid },
        angular.extend({}, this, {_id:undefined}),
        cb
      );
    }

    RouteEdit.prototype.destroy = function(cb) {
      return RouteEdit.remove({id: this._id.$oid}, cb);
    };

    return RouteEdit;
  })
  .factory('Weather', function($resource) {
    var Resource = $resource('https://api.forecast.io/forecast/:apikey/:lat,:lon',
      {
        callback:'JSON_CALLBACK',
        units: 'si',
        lat: '@lat',
        lon: '@lon',
        apikey: '4c327a918629278ca227b67846a110f3'
      },
      {
        get: {method:'JSONP', params:{ isArray: true }}
      }
    );
    
    return Resource;
  })
  .factory('routeCache', function($cacheFactory) {
    return $cacheFactory('routeCache', {capacity:1})
  });