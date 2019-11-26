module.exports = {


  friendlyName: 'Delete',


  description: 'Delete company.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req;

    const companyDeleted = await Company.destroyOne({ id: req.params.id})

    if (!companyDeleted) return { success: false, result: { message: 'Failed' }}

    return { success: true }

  }


};
