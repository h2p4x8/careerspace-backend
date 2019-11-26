module.exports = {


  friendlyName: 'Read by id',


  description: '',


  inputs: {
  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req;

    const profile = await UserProfile.findOne({ url: req.params.url })

    if (!profile) return ({ success: true })
    else return ({ success: false })

  }


};
