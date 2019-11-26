module.exports = {


  friendlyName: 'Read by id',


  description: '',


  inputs: {
  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req;

    const where = { readyToMeeting: true };

    if (req.session.passport.user ? req.session.passport.user.id : false) {
      where.user = { '!=': [req.session.passport.user.id] }
    }

    console.log(where)

    const profile = req.params.url ? await UserProfile.findOne({ url: req.params.url }).populate('user').populate('jobList', { sort: 'order ASC'  }) : await UserProfile.find({ where: where, sort: 'createdAt DESC' })
                                                                                                                                                                        .populate('user')
                                                                                                                                                                        .populate('jobList', { sort: 'order ASC'  })
                                                                                                                                                                        .populate('functions')
                                                                                                                                                                        .populate('industry')

    if (profile) return ({ success: true, result: { profile } })
    else return ({ success: false })

  }


};
