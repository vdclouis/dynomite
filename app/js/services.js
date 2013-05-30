angular.module('Dynomite.services', ['ngResource'])
  .value('version', '0.1')
  .factory('Areas', function($resource) {
    var Areas = $resource(
        'https://api.mongolab.com/api/1/databases/dynomite/collections/areas/:id',
        {
          apiKey: 'zmU_BDz4u4CsCpTltEbxOlPazJOFZtPE'
        },
        {
          update: { method: 'PUT' }
        }
    );
    
    Areas.prototype.update = function(cb) {
      return Areas.update({id: this._id.$oid},
        angular.extend({}, this,  {_id:undefined}), cb);
    };
    
    Areas.prototype.destroy = function(cb) {
      return Areas.remove({id: this._id.$oid}, cb);
    };
    
    return Areas;
    
  })
  .factory('Routes', function($resource) {
  })
  .factory('Weather', function($resource) {
    var resource = $resource('https://api.forecast.io/forecast/4c327a918629278ca227b67846a110f3/51.0500,3.7167',
    { 
      callback:'JSON_CALLBACK'
    },
    {
      get: {method:'JSONP', params:{ isArray: true }}
    }
    );
    return resource;
  });