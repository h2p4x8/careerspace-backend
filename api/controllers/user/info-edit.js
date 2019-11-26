module.exports = {


  friendlyName: 'Info edit',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req,
          res = this.res;

    const {
      fullName,
      position,
      company,
      email,
      functions,
      industry
    } = req.body;

    let updatedData = {};
    if (typeof fullName != 'undefined') updatedData.fullName = fullName;
    if (company||position) {
      const data = { user: req.session.passport.user.id, order: 0 };
      if (company) data.companyName = company;
      if (position) data.positionName = position;
      const job = await UserJob.findOrCreate({ user: req.session.passport.user.id }, data)
                               .exec(async (err, newOrExistingRecord, wasCreated) => {
                                 if (newOrExistingRecord) {
                                   await UserJob.update(newOrExistingRecord.id, data);
                                 }
                                 await UserJob.addToCollection(newOrExistingRecord.id, 'industry').members(industry);
                                 await UserJob.addToCollection(newOrExistingRecord.id, 'functions').members(functions);
                               })
    }
    if (email) updatedData.email = email;

    const user = await User.updateOne({ id: req.session.passport.user.id }).set(updatedData);

    if (!user) return { success: false, result: { message: 'User not found' }};


    return {
      success: true,
      result: { user }
    }
  }

};
