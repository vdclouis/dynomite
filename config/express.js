
/*
 *  Express middelware setup
 */

var express = require('express')
  , helpers = require('view-helpers')
  , mongoStore = require('connect-mongo')(express)
  , flash = require('connect-flash')

module.exports = function (app, config, passport) {

  app.set('showStackError', true);
  // should be placed before express.static

  app.use(express.favicon(config.root + '/app/favicon.ico'));

  console.log("trust proxy");
  //app.enable('trust proxy');

  //compress static   files
  /*app.use(express.compress({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
    },
    level: 9
  }))*/

  // development only
  if ('development' == app.get('env')) {
    app.use(express.static(
      config.root + '/app', {
        //Browser cache maxAge in milliseconds. defaults to 0
        //maxAge: oneDay,
        //Allow transfer of hidden files. defaults to false
        //hidden: true
        //Redirect to trailing "/" when the pathname is a dir. defaults to true
        //redirect: true
      }
    ));
    // set views path, template engine and default layout
    app.set('views', config.root + '/app');
  }
  // production onl
  if ('production' == app.get('env')) {
    app.use(express.static(
      config.root + '/dist'
    ));
    app.set('views', config.root + '/dist');
  }

  // Necesarry for filereader etc
  app.use(express.bodyParser());

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  // app.set('view options', { layout: false });

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

    //app.use(express.cookieSession({ secret: 'tobo!', key: 'XSRF-TOKEN'}));

    // bodyParser should be above methodOverride
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // express/mongo session storage
    // should be initialized before passport.session
    app.use(express.session({
      secret: 'MEAN',
      store: new mongoStore({
        url: config.db,
        collection : 'sessions'
      })
    }));

    // set the cookie options
    app.use( function (req, res, next) {
      if ( req.method == 'POST' && req.url == '/login' ) {
        if ( req.body.rememberme ) {
          //req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
          req.session.cookie.maxAge = 604800000; // 7*24*60*60*1000 Rememeber 'me' for 7 day
        } else {
          req.session.cookie.expires = false;
        }
      }
      next();
    });

    // connect flash for flash messages
    app.use(flash());

    // dynamic helpers
    app.use(helpers(config.app.name));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    /*var csrfValue = function(req) {
      var token = (req.body && req.body._csrf)
        || (req.query && req.query._csrf)
        || (req.headers['x-csrf-token'])
        || (req.headers['x-xsrf-token']);
      return token;
    };

    app.use(function(req, res, next) {
      res.cookie('XSRF-TOKEN', req.session._csrf);
      next();
    });

    //
    app.use(express.csrf({value: csrfValue}));*/

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
};
