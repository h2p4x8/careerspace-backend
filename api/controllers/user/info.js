module.exports = {


  friendlyName: 'User info',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req,
          res = this.res;

    console.log(req.session)
    const user = await User.findOne({ id: req.session.passport.user.id }).populate('subscriptionOptions').populate('profile');

    if (!user) return { success: false, result: { message: 'User not found' }};


    return {
      success: true,
      result: { user }
    }

  }


};
