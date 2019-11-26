module.exports = {


  friendlyName: 'Create',


  description: 'Create company.',


  inputs: {
    name: {
      type: 'string',
      required: true
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
    console.log(inputs)
    const companyNew = await Company.create(inputs).fetch();
    if (inputs.industry) {
      await Company.addToCollection(companyNew.id, 'industries').members(inputs.industry);
    }

    if(!companyNew) return { success: false, result: { message: 'Failed' }};
    return { success: true, result: { companyNew }};

  }


};
