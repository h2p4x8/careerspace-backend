module.exports = {


  friendlyName: 'Read',


  description: 'Read vacancy.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req;
    let vacancyList;
    if (req.params.id) {
      vacancyList = await Vacancy.findOne({ id_hash: req.params.id })
      .populate('companyName')
      .populate(
        'industryMap', {
          select: ['id']
        }).populate(
          'mapPositionsTo', {
          select: ['id', 'name']
        }).populate('contact');
    } else {
      vacancyList = await Vacancy.find({ sort: 'createdAt DESC' }).populate('companyName').populate(
        'industryMap', {
          select: ['id']
        }).populate(
          'mapPositionsTo', {
          select: ['id', 'name']
        });
    }

    if (vacancyList) return ({ success: true, result: { vacancyList } })
    else return ({ success: false })

  }


};
