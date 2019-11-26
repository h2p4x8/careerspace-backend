module.exports = {


  friendlyName: 'Read',


  description: 'Read vacancy.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req;
    const companyName = await Company.find({
      name: {'contains' : req.params.search}
    })
    const companiesId = companyName.map(el => el.id);
    const vacancyList = await Vacancy.find({
      where: {
        or: [
          { positionName: {'contains' : req.params.search} },
          { city: {'contains' : req.params.search} },
          { companyName: companiesId }
        ]
      },
      sort: 'createdAt DESC'
    }).populate('companyName')
      .populate(
      'industryMap', {
        select: ['id']
      })
      .populate(
        'mapPositionsTo', {
        select: ['id', 'name']
      });
    if (vacancyList) return ({ success: true, result: { vacancyList } })
    else return ({ success: false })

  }


};
