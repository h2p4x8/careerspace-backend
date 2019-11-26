module.exports = {


  friendlyName: 'Update',


  description: 'Update company.',


  inputs: {
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    typeOfCompany: {
      type: 'string',
    },
    industries: {
      type: 'json',
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req;
    console.log(inputs)
    const companyUpdated = await Company.updateOne({ id: req.params.id }).set(inputs);
    if (inputs.industry) {
      await Company.addToCollection(companyNew.id, 'industries').members(inputs.industry);
    }


    if(!companyUpdated) return { success: false, result: { message: 'Failed' }};
    return { success: true, result: { companyUpdated }};
  }


};
