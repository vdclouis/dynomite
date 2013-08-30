var async = require('async');
var v1 = '/api/v1';

module.exports = function (app, passport, auth) {

  var index = require('../cogs/controllers/index');
  app.get('/', index.index);

  //public views
  //accecible by anyone
  app.get('/views/:partial', index.partials);

  //private views:
  //ng-controllers of these views should not be visible for 
  //unauthenticated users or the app will choke
  app.get('/views/secure/:partial', auth.requiresLogin, index.partials);

  var users = require('../cogs/controllers/users');
  app.get('/users/logout', users.logout);
  app.get('/users', auth.requiresLogin);
  app.get('/users/me', users.me);
  //app.get('/users/:userId', users.show);
  app.get('/usersData/:userName', users.show);

  // User params
  app.param('userId', users.userId);
  app.param('userName', users.userName);

  // registere + login POST request
  app.post('/register', users.create);
  app.post(
    // the form post route
    '/users/session'
    ,function(req, res, next) {
      passport.authenticate(
        'local'
        // arguments are what is returned from passport function
        , function(err, user, info) {

          if (err) {
            return res.send({ 'status':'err', 'message':err.message });
          }
          if (!user) {
            return res.send({ 'status':'fail', 'type': info.type, 'message': info.message });
          }
          req.logIn(user, function(err) {
            if (err) { 
              return res.send({ 'status':'err', 'message':err.message }); 
            }
            return res.send({ 'status':'ok', 'username': user.name });
          });

        }
      )(req, res, next);
    }
    ,function(err, req, res, next) {
      // 
      var t = {
        'status':'err',
        'message':err.message,
        'user': req.user ? JSON.stringify(req.user) : "null"
      };
      return res.send(t);
    }
    // redirect after succesfull login
    //users.loginSuccesRedirect
  );

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
  app.get(v1 + '/routez/:areaId', routes.showbyarea); // Experimental
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
  app.put(v1 + '/comments/:commentId', comments.update);
  app.del(v1 + '/comments/:commentId', comments.destroy);

  // Finsh by setting the commentId param
  app.param('commentId', comments.comment);

  // wildcard
  app.get('*', index.index);
};