var crypto = require("crypto");

module.exports = {


  friendlyName: 'Generate new pass',


  description: '',


  inputs: {
    password: {
      type: 'string',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req,
          res = this.res;
    const user = await User.findOne({ id: req.session.passport.user.id })
                            .then( async (user) => {
                              await UserCredencial.destroyOne({ user: user.id});
                              const userCredentialData = {
                                                  password: inputs.password,
                                                  strategy: 'local',
                                                  user: user.id
                                                };
                              return UserCredencial.create(userCredentialData)
                                                  .fetch()
                                                  .then( async (cred) => {
                                                    await User.addToCollection(user.id, 'credentialList').members(cred.id);
                                                    return true;
                                                  })
                                                  .catch(err => {
                                                    return false;
                                                  })
                            })
                            .catch(err => {
                              console.log(err)
                              return false;
                            })
    if (user) return {success: true};
    else return {success: false};
  }


};
