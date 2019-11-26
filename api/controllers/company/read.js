module.exports = {


  friendlyName: 'Read',


  description: 'Read company.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req;

    const companyList = req.params.id ? await Company.findOne({ id: req.params.id }).populate('contactList').populate('industries') : await Company.find({  sort: [{ 'id': 'DESC' }] }).populate('contactList').populate('industries') 


    if (!companyList) return { success: false, result: { message: 'Failed' }};
    return { success: true, result: { companyList }};

  }
};
