module.exports = {


  friendlyName: 'Read by id',


  description: '',


  inputs: {
  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req;

    const job = req.params.id ? await UserJob.findOne({ id: req.params.id }).populate('functions').populate('industry') : await UserJob.find({ where: { user: req.session.passport.user.id }, sort: 'order ASC' }).populate('functions').populate('industry')

    if (job) return ({ success: true, result: { job } })
    else return ({ success: false })

  }


};
