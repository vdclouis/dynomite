//var async = require('async');

exports.index = function(req, res, next){
  //console.log('index.html');
  /*res.render('index', {
    user: req.user ? JSON.stringify(req.user) : "null"
  }
  )*/
  res.render('index');
}

exports.partials = function(req, res){
  var name = req.params.partial;
  res.render('partials/'+name);
};

exports.test = function(req, res){
  //console.log('test.html');
  res.render('index');
};

exports.area = function(req, res){
  console.log('area.html');
  //res.render('area');
};
