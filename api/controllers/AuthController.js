const passport = require('passport');

const passStrategy = {
  local: 'local'
}

module.exports = {
  login: async function (req, res, exits) {
    return passport.authenticate('local', async function (err, user, info) {
      if ((err) || (!user)) {
        return res.json({
          success: false,
          message: info.message,
        });
      }

      return req.logIn(user, async function (err) {
        if (err) return res.json({ err });
        return res.json({
          success: true,
          message: info.message,
          result: { user }
        });
      });
    })(req, res);
  },

  logout: function(req, res) {
      req.logout();
      res.json({ success: true });
  },

  register: async function(req, res) {
    const userRole = await UserRole.findOne({ name: 'user' });
    console.log(userRole);
    const {
            email,
            username,
            password,
            strategy,
          } = req.body;
    const userData = {
            email,
            username,
            role: userRole.id,
          };
    /*const userData = {
            email,
            username,
    };*/

    User.create(userData)
        .fetch()
        .then( user => {
          //console.loguser ', user)
          const userCredentialData = {
                              password,
                              strategy,
                              user: user.id
                            };
          UserCredencial.create(userCredentialData)
                        .then( async () => {
                          req.logIn(user, () => {
                            return res.send({ success: true, result: { user }});
                          })
                        })
        })
        .catch(err => {
          console.log(err)
          return res.json({ success: false })
        })

      }
}
