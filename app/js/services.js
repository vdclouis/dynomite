var apikey = 'zmU_BDz4u4CsCpTltEbxOlPazJOFZtPE';

angular.module('Dynomite.services', ['ngResource'])
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
    }

    
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
        console.log(Routes);
        Routes.prototype.update = function(cb) {
          return Routes.update({id: this._id.$oid},
          angular.extend({}, this, {_id:undefined}), cb);
        };
        Routes.prototype.destroy = function(cb) {
          return Routes.remove({id: this._id.$oid}, cb);
        };
        return Routes;
      },
      routeById: function() {
        var Routes = $resource(
          'https://api.mongolab.com/api/1/databases/dynomite/collections/routes?q={"routeName"\\:":routeName"}&apiKey=' + apikey,
          {
            routeName: '@routeName'
          },
          {
            update: { method: 'PUT' },
            show: { method: 'GET' }
          }
        );
        Routes.prototype.update = function(cb) {
          return Routes.update({id: this._id.$oid},
          angular.extend({}, this, {_id:undefined}), cb);
        };
        Routes.prototype.destroy = function(cb) {
          return Routes.remove({id: this._id.$oid}, cb);
        };
        return Routes;
      }
    }
  })
  .factory('Weather', function($resource) {
    var Resource = $resource('https://api.forecast.io/forecast/4c327a918629278ca227b67846a110f3/51.0500,3.7167',
      {
        callback:'JSON_CALLBACK'
      },
      {
        get: {method:'JSONP', params:{ isArray: true }}
      }
    );
    
    return Resource;
    
  });