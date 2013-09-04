
//var async = require('async');

var userRoles = require('../../app/scripts/routingConfig').userRoles
  , accessLevels = require('../../app/scripts/routingConfig').accessLevels;

exports.index = function(req, res, next){

  console.log("get index.html");

  // default values
  var role = userRoles.public
  , username = '';

  // overwrite the values if already logged in
  if(req.user){
    //console.log('req.user.email', req.user.email)
    //console.log('req.user.role', req.user.role)
    username = req.user.username,
    role = req.user.role
  };

  // cookie content
  var cookieContent = JSON.stringify({
    'username': username,
    'role': role
  });

  //console.log(cookieContent);

  // send the user with a cookie
  res.cookie('user', cookieContent);

  //renders the indexpage on first pageload
  res.render('layout'
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