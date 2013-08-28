'use strict';

angular.module('dynomiteApp')
  .factory("Global", function(){

    var _this = this;
      console.log("Global", this);
      _this._data = { 
        user: window.user,
        authenticated: !!window.user
      };

    return _this._data;
  }); 