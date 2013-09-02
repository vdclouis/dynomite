
//var async = require('async');

var userRoles = require('../../app/scripts/routingConfig').userRoles
  , accessLevels = require('../../app/scripts/routingConfig').accessLevels;

exports.index = function(req, res, next){

  console.log(req.user);

  /*res.render('index'
  , {
    user: req.user ? JSON.stringify(req.user) : "null"
  }
  );*/

  // default values
  var role = userRoles.public
  , username = '';

  // overwrite the values if already logged in
  if(req.user){
    username = req.user.email,
    role = req.user.role
  };

  // send the user with a cookie
  res.cookie('user', JSON.stringify({
    'userEmail': username,
    'role': role
  }));

  //renders the indexpage on first pageload
  res.render('index'
  /*, {
    user: req.user ? JSON.stringify(req.user) : "null"
  }*/
  );
};

exports.partials = function(req, res){
  //console.log('partial', req.params.partial);
  var name = req.params.partial;
  res.render('views/'+name);
};

exports.forms = function(req, res){
  var name = req.params.partial;
  res.render('views/'+name);
};