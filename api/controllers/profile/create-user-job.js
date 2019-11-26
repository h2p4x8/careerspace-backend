module.exports = {


  friendlyName: 'Read by id',


  description: '',


  inputs: {
    positionName: {
      type: 'string'
    },
    companyName: {
      type: 'string'
    },
    functions: {
      type: 'json'
    },
    industry: {
      type: 'json'
    },
    order: {
      type: 'number'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req,
          data = {
            positionName: inputs.positionName,
            companyName: inputs.companyName,
            user: req.session.passport.user.id,
            order: inputs.order
          };
    const profile = await UserProfile.findOne({ user: req.session.passport.user.id })
                                     .populate('industry')
                                     .populate('functions');

    data.profile = profile.id;

    const job = await UserJob.create(data).fetch();

    if (inputs.industry) {
      await UserJob.addToCollection(job.id, 'industry').members(inputs.industry);
      console.log('1', inputs.industry)
      const newIndustry = inputs.industry.filter(el => !profile.industry.some(ind => ind.id === el));
      console.log('2', newIndustry)
      if (newIndustry.length > 0) {
        await UserProfile.addToCollection(profile.id, 'industry').members(newIndustry);
      }
    }
    if (inputs.functions) {
      await UserJob.addToCollection(job.id, 'functions').members(inputs.functions);
      console.log('1', inputs.functions)
      const newFunctions = inputs.functions.filter(el => !profile.functions.some(ind => ind.id === el));
      console.log('2', newFunctions)
      if (newFunctions.length > 0) {
        await UserProfile.addToCollection(profile.id, 'functions').members(newFunctions);
      }
    }

    if (job) {
      await User.addToCollection(req.session.passport.user.id, 'jobList').members(job.id)
      await UserProfile.addToCollection(profile.id, 'jobList').members(job.id)
    }


    if (job) return ({ success: true })
    else return ({ success: false })

  }


};
