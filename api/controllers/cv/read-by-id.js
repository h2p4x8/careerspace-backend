module.exports = {


  friendlyName: 'Read by id',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req;

    const userCV = await CurriculumVitae.findOne({ id: req.params.id, user: req.session.passport.user.id })

    if (userCV) return ({ success: true, result: { userCV } })
    else return ({ success: false })

  }


};
