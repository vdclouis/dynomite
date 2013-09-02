
var _ = require('underscore');

/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {

  //console.log(req);

  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  };
  next();
  
};

exports.ensureAuthorized = function(req, res, next) {
  var role;
  if(!req.user){
    role = userRoles.public;
  } else {
    role = req.user.role;
  }
  var accessLevel = _.findWhere(routes, { path: req.route.path }).accessLevel || accessLevels.public;

  if(!(accessLevel.bitMask & role.bitMask)){
    return res.send(403);
  }

  return next();
}


/*
 *  User authorizations routing middleware
 */

exports.user = {
  hasAuthorization : function (req, res, next) {
    if (req.profile.id != req.user.id) {
      return res.redirect('/users/'+req.profile.id)
    };
    next();
  }
}


/*
 *  Article authorizations routing middleware
 */

exports.article = {
  hasAuthorization : function (req, res, next) {
    if (req.article.user.id != req.user.id) {
      return res.redirect('/articles/'+req.article.id)
    };
    next();
  }
}
