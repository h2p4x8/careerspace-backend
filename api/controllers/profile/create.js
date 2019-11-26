module.exports = {


  friendlyName: 'Create',


  description: 'Create cv.',


  inputs: {
    url: {
      type: 'string',
      required: true,
    },
    functions: {
      type: 'json'
    },
    industry: {
      type: 'json'
    },
  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req,
          res = this.res,
          user = req.session.passport.user.id,
          data = { url: inputs.url };

    data.user = user;

    const userObj = await User.findOne(user).populate('jobList');

    const profile = await UserProfile.create(data).fetch();
    if (userObj.jobList.length > 0) {
        await UserProfile.addToCollection(profile.id, 'jobList').members(userObj.jobList.map(el => el.id))
    }
    await User.update(user, { profile: profile.id })
    if (inputs.functions) {
      await UserProfile.addToCollection(profile.id, 'functions', inputs.functions);
      inputs.functions.forEach(async el => {
        await MapFunction.addToCollection(el, 'users', profile.id);
      })
    }
    if (inputs.industry) {
      await UserProfile.addToCollection(profile.id, 'industry', inputs.industry);
      inputs.industry.forEach(async el => {
        await MapIndustry.addToCollection(el, 'users', profile.id);
      })
    }
    
    if (profile) return { success: true }
    else return { success: false }
  }


};
