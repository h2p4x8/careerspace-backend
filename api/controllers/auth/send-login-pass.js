var crypto = require("crypto");

module.exports = {


  friendlyName: 'Send login pass',


  description: '',


  inputs: {
    email: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    const {
      email
    } = inputs;
    let password = null;
    for (let i = 0; i < 3; i++) {
      if (i === 0) password = crypto.randomBytes(2).toString('hex');
      password = password + '-' + crypto.randomBytes(2).toString('hex');
    }
    const user = await User.findOne({ email });
    if (user) {
      await UserCredencial.destroyOne({ user: user.id });
      const credential = await UserCredencial.create({ user: user.id, strategy: 'local', password }).fetch()
      await User.addToCollection(user.id, 'credentialList').members(credential.id);
      if (credential) {
        const letterToUser = await sails.helpers.sendNewPass.with({
          userPass: password,
          userEmail: user.email,
          type: 'login'
        });
        return { success: true, result: { message: 'login' } }
      } else return { success: false }
    } else {
      const newUser = await User.create({ email })
                                .fetch()
                                .then( user => {
                                  const userCredentialData = {
                                    password,
                                    strategy: 'local',
                                    user: user.id
                                  };
                                  return UserCredencial.create(userCredentialData)
                                                .fetch()
                                                .then(async (cred) => {
                                                    await User.addToCollection(user.id, 'credentialList').members(cred.id);
                                                    return true;
                                                })
                                })
                                .catch(err => {
                                  console.log(err)
                                  return false;
                                })
    if (newUser) {
      console.log()
      const letterToUser = await sails.helpers.sendNewPass.with({
                                    userPass: password,
                                    userEmail: email,
                                    type: 'signup'
                                  });
        return { success: true, result: { message: 'signup' } }
      } else return { success: false }
    }


        return;

  }


};
