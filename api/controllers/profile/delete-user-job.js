module.exports = {


  friendlyName: 'Delete',


  description: 'Delete user job.',


  inputs: {
  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req;

    const result = await UserJob.destroyOne({ id: req.params.id});
    
    if (result) return { success: true }
    else return { success: false, result: { message: 'Failed' }};
  }
};
