module.exports = {


  friendlyName: 'User cv',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req,
          res = this.res;

    const user = await User.findOne({ id: req.session.passport.user.id }).populate('cvList');

    if (!user) return { success: false, result: { message: 'User not found' }};

    return {
      success: true,
      result: { cvList: user.cvList }
    };

  }

};
