const client = sails.config.storage;
client.authenticate()

module.exports = {


  friendlyName: 'Create',


  description: 'Create cv.',


  inputs: {
    description: {
      type: 'string'
    },
    url: {
      type: 'string'
    },
    telegram: {
      type: 'string'
    },
    readyToMeeting: {
      type: 'boolean'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req,
          res = this.res,
          user = req.session.passport.user.id;

    console.log(inputs)
    const result = await UserProfile.updateOne({ user }).set(inputs)
    if (result) return { success: true }
    else return { success: false, result: { message: 'Failed' }};
  }
};
