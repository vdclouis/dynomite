var apikey = 'zmU_BDz4u4CsCpTltEbxOlPazJOFZtPE';

angular.module('Dynomite.services', ['ngResource'])
  .value('version', '0.1')
  .factory('Areas', function($resource) {
    var Areas = $resource(
      'https://api.mongolab.com/api/1/databases/dynomite/collections/areas/:id',
      {
        apiKey: apikey
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
    
  })
  .factory('Routes', function($resource) {
    var Routes = $resource(
      'https://api.mongolab.com/api/1/databases/dynomite/collections/routes?q={"areaName"\\:":areaName"}&apiKey=' + apikey,
      {
        areaName: '@areaName'
      },
      {
        update: { method: 'PUT' }
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
    
  })
  .factory('Weather', function($resource) {
    var Resource = $resource('https://api.forecast.io/forecast/4c327a918629278ca227b67846a110f3/:lat,:lon',
      {
        callback:'JSON_CALLBACK',
        lat: '@lat',
        lon: '@lon'
      },
      {
        get: {method:'JSONP', params:{ isArray: true }}
      }
    );
    
    return Resource;
    
  });