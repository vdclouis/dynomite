
/*
 *  Server initialization
 */

var express = require('express')
  , fs = require('fs')
  , passport = require('passport')
  , mongoose = require('mongoose');
  
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , auth = require('./config/authorization');

// Bootstrap db connection
var db = mongoose.connect(config.db);

// Watch the connection
var cdb = mongoose.connection;

// warn if connection is lost
cdb.on('error', console.error.bind(
  console, 'database connection error:'
));

// warn when connection is established
cdb.once('open', function callback () {
  console.log('Connected to DB');
});

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

var port = process.env.PORT || 1337;
app.listen(port);
console.log('Express app started on port ' + port);

exports = module.exports = app;
