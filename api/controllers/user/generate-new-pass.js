var crypto = require("crypto");

module.exports = {


  friendlyName: 'Generate new pass',


  description: '',


  inputs: {
    email: {
      type: 'string',
      required: true,
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req,
      res = this.res;
    const user = await User.findOne({ email: inputs.email })
      .then(async (user) => {
        await UserCredencial.destroyOne({ user: user.id });
        const password = crypto.randomBytes(10).toString('hex');
        const userCredentialData = {
          password,
          strategy: 'local',
          user: user.id
        };
        return UserCredencial.create(userCredentialData)
          .fetch()
          .then(async (cred) => {
            await User.addToCollection(user.id, 'credentialList').members(cred.id);
            const letterToUser = await sails.helpers.sendNewPass.with({
              userPass: password,
              userEmail: user.email
            });
            return letterToUser.success;
          })
          .catch(err => {
            return false;
          })
      })
      .catch(err => {
        console.log(err)
        return false;
      })
    if (user) return { success: true };
    else return { success: false };
  }


};
