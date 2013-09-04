var async = require('async');
var v1 = '/api/v1';

module.exports = function (app, passport, auth) {

  var index = require('../cogs/controllers/index');

  app.get('/', index.index);

  //public views
  //accecible by anyone
  app.get('/views/:partial', index.partials);

  app.get('/forms/:partial', index.forms);

  //private views:
  //ng-controllers of these views should not be visible for 
  //unauthenticated users or the app will choke
  app.get('/secure/views/:partial', auth.requiresLogin, index.partials);

  var users = require('../cogs/controllers/users');
  //app.get('/users', auth.requiresLogin);
  app.get('/users', users.all);
  app.get('/users/me', users.me);
  //app.get('/users/:userId', users.show);
  app.get('/usersData/:userName', users.show);

  // User params
  app.param('userId', users.userId);
  app.param('userName', users.userName);

  // registere + login POST request
  app.post('/register', users.create);
  app.post('/login'
    ,function(req, res, next) {
      console.log("postrequest");
      passport.authenticate(
        'local',
        { session: false }
        /*
         * arguments are what is returned from passport function
         *
         * returns json with info for the view
         */
        , function(err, user, info) {
          console.log("passport local:");
          console.log(user);
          if (err) {
            return res.send({ 'status': 'err', 'message': err.message });
          }
          if (!user) {
            return res.send('500', { 'status':'fail', 'type': info.type, 'message': info.message });
          }
          req.logIn(user, function(err) {
            /*if ( req.body.rememberme ) {
              console.log('req.body.rememberme:');
              console.log(req.body.rememberme);
              req.session.cookie.maxAge = 86400000; // 10*24*60*60*1000 Rememeber 'me' for 10 days
              //req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
            } else {
              req.session.cookie.expires = false;
            }*/
            if (err) {
              return res.send({ 'status':'err', 'message':err.message }); 
            }
            //return res.send({ 'status':'ok', 'user': user });
            res.json(200, { "role": user.role, "username": user.username });
          });
        }
        //, index.index
      )(req, res, next);
    }
  );
  app.post('/logout', users.logout);


  // Area Routes
  var areas = require('../cogs/controllers/areas');
  app.get(v1 + '/areas', areas.all);
  app.post(v1 + '/areas', areas.create);
  app.get(v1 + '/areas/:areaId', areas.show);
  app.put(v1 + '/areas/:areaId', areas.update);
  app.del(v1 + '/areas/:areaId', areas.destroy);

  // Finish by setting up the areaId param
  app.param('areaId', areas.area);

  // Route Routes (confusing much)
  var routes = require('../cogs/controllers/routes');
  app.get(v1 + '/routes', routes.all);
  app.post(v1 + '/routes', routes.create);
  app.get(v1 + '/routes/:routeId', routes.show);
  app.get(v1 + '/routez/:areaId', routes.showbyarea);
  app.put(v1 + '/routes/:routeId', routes.update);
  app.del(v1 + '/routes/:routeId', routes.destroy);

  // Finish by setting up the routeId param
  app.param('routeId', routes.route);
  app.param('areaId', routes.routebyarea);

  // Comments Routes
  var comments = require('../cogs/controllers/comments');
  app.get(v1 + '/comments', comments.all);
  app.post(v1 + '/comments', comments.create);
  app.get(v1 + '/comments/:commentId', comments.show);
  app.get(v1 + '/commentz/:routeId', comments.showbyroute);
  app.put(v1 + '/comments/:commentId', comments.update);
  app.del(v1 + '/comments/:commentId', comments.destroy);

  // Finish by setting the commentId param
  app.param('commentId', comments.comment);
  app.param('routeId', comments.commentbyroute);

  // wildcard
  app.get('/*', index.index);
};