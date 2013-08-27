
var async = require('async')

exports.index = function(req, res){
  //console.log('index.html');
  res.render('index');
}

exports.test = function(req, res){
  //console.log('test.html');
  res.render('index');
}

exports.area = function(req, res){
  //console.log('test.html');
  //res.render('area');
}
