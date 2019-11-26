module.exports = {


  friendlyName: 'Create',


  description: 'Create cv.',


  inputs: {
    name: {
      type: 'string'
    },
    fullName:{
      type: 'string'
    },
    livingPlace: {
      type: 'string'
    },
    age: {
      type: 'number'
    },
    phone: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    summary: {
      type: 'string'
    },
    careerHistory: {
      type: 'json'
    },
    education: {
      type: 'json'
    },
    extra: {
      type: 'json'
    },
    order: {
      type: 'json'
    },
  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req,
          res = this.res;
    const user = req.session.passport.user.id;
    const data = inputs;
    data.user = user;
    const userProfile = await User.findOne({ id: user }).populate('cvList');
    console.log('user ', userProfile)
    if (userProfile.cvList.length === 1) {
      if (userProfile.subscriptionStatus !== 'active') return { success: false, result: { message: 'off limit' } }
    }

    const result = await CurriculumVitae.create(data).fetch();

    if (result) {
      await User.addToCollection(user, 'cvList').members(result.id);
      const cvPdf = await sails.helpers.makePdfCv1.with({
        cvId: result.id,
        userId: user,
      });
      if (cvPdf) return { success: true, result }
    } return { success: false, result: { message: 'Failed' }};
  }


};
