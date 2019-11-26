var passport = require('passport');

module.exports = {

  googleAuth: function(req, res) {
    passport.authenticate('google', { scope: ['email', 'profile'] })(req, res);
  },

  googleCallback:  function(req, res, next) {
    passport.authenticate('google', function(err, user, type) {
      req.logIn(user, function(err) {
      if (err) {
        console.log(err);
        res.view('500');
        return;
      }
      res.redirect(`/auth?user=${type}&type=gauth`);
        return;
      });
  })(req, res);
}

};
