module.exports = {


  friendlyName: 'Read',


  description: 'Read industries by company.',


  inputs: {
    companies: {
      type: 'json'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req;

    const companyList = await Company.find({ id: inputs.companies }).populate('industries');

    const industrySet = companyList.reduce((acc, curtVal) => {
                curtVal.industries.forEach(el => {
                  acc.add(el.id);
                })
                return acc;
              },
              new Set()
            );
    console.log('industrySet', industrySet)

    const industryList = await MapIndustry.find({ id: [...industrySet] });

    if (!industryList) return { success: false, result: { message: 'Failed' }};
    return { success: true, result: { industryList }};

  }
};
