
var express = require('express')
  , fs = require('fs')
  , passport = require('passport')
  , mongoose = require('mongoose');
  
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , auth = require('./config/authorization');

// Bootstrap db connection
var db = mongoose.connect(config.db);

// Bootstrap models
var models_path = __dirname + '/cogs/models';
fs.readdirSync(models_path).forEach(function (file) {
  //HAHA!
  if(file!='.DS_Store'){
    require(models_path+'/'+file)
  }
});

// bootstrap passport config
require('./config/passport')(passport, config);

var app = express();

// express settings
require('./config/express')(app, config, passport);

// Bootstrap routes
require('./config/routes')(app, passport, auth);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express app started on port ' + port);

exports = module.exports = app;
