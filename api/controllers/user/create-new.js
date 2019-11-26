var crypto = require("crypto");

module.exports = {

  friendlyName: 'Create new',


  description: '',


  inputs: {
    email: {
      type: 'string',
      required: true,
    },
    fullName: {
      type: 'string',
      required: true,
    },
    position: {
      type: 'string',
    },
    company: {
      type: 'string',
    },
    role: {
      type: 'string',
      required: true,
    }
  },

  exits: {

  },


  fn: async function (inputs) {
    const newUser = await User.create(inputs)
        .fetch()
        .then( user => {
         //console.log('user ', user)
          const password = crypto.randomBytes(10).toString('hex');
          const userCredentialData = {
                              password,
                              strategy: 'local',
                              user: user.id
                            };
          return UserCredencial.create(userCredentialData)
                                .then(() => {
                                  return { email: user.email, password }
                                })
        })
        .catch(err => {
          console.log(err)
          return false;
        })

    if (!newUser) return { success: false, result: { message: 'Failed' }};
    return { success: true, result: { newUser }};

  }
};
