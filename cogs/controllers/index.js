//var async = require('async');

exports.index = function(req, res, next){
  res.render('index', {
    user: req.user ? JSON.stringify(req.user) : "null"
  });
}

exports.partials = function(req, res){
  //console.log('partial', req.params.partial);
  var name = req.params.partial;
  res.render('partials/'+name);
};