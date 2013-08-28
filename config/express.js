
var express = require('express')
  , helpers = require('view-helpers')
  , mongoStore = require('connect-mongo')(express)
  , flash = require('connect-flash')
  //, connect = require('connect')

module.exports = function (app, config, passport) {

  app.set('showStackError', true);
  // should be placed before express.static

  app.use(express.favicon());

  //compress static files
  /*app.use(express.compress({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
    },
    level: 9
  }))*/

  app.use(express.static(config.root + '/app/'));

  // set views path, template engine and default layout
  app.set('views', config.root + '/views');
  //app.set('views', config.root + '/app/views/partials');
  //app.set('view engine', 'jade')
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

  // enable jsonp
  app.enable("jsonp callback")

  app.configure(function () {
    // don't use logger for test env
    if (process.env.NODE_ENV !== 'test') {
      app.use(express.logger('dev'))
      //app.use(express.logger(':method :url - :referrer'));
    }

    // cookieParser should be above session
    app.use(express.cookieParser());

    // bodyParser should be above methodOverride
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // express/mongo session storage
    app.use(express.session({
      secret: 'MEAN',
      store: new mongoStore({
        url: config.db,
        collection : 'sessions'
      })
    }));

    // connect flash for flash messages
    app.use(flash());

    // dynamic helpers
    app.use(helpers(config.app.name));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // routes should be at the last
    app.use(app.router);

    // assume "not found" in the error msgs
    // is a 404. this is somewhat silly, but
    // valid, you can do whatever you like, set
    // properties, use instanceof etc.
    app.use(function(err, req, res, next){
      // treat as 404
      if (~err.message.indexOf('not found')) return next()

      // log it
      console.error(err.stack);

      // error page
      res.status(500).render('500', { error: err.stack });
    });

    // assume 404 since no middleware responded
    app.use(function(req, res, next){
      res.status(404).render('404', { url: req.originalUrl, error: 'Not found' });
    });

    function clientErrorHandler(err, req, res, next) {
      if (req.xhr) {
        res.send(500, { error: 'Something blew up!' });
      } else {
        next(err);
      }
    }

    // development only
    if ('development' == app.get('env')) {

    }
    // production only
    if ('production' == app.get('env')) {

    }

  })
}
