module.exports = {


  friendlyName: 'Delete',


  description: 'Delete user.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req;

    const deletedUserJobs = await UserJob.destroy({ user: req.params.id})
    const deletedUserCV = await CurriculumVitae.destroy({ user: req.params.id})
    const deletedUserProfile = await UserProfile.destroy({ user: req.params.id})
    const deletedUser = await User.destroyOne({ id: req.params.id})



    if (!deletedUser) return { success: false, result: { message: 'Failed' }}

    return { success: true }

  }


};
