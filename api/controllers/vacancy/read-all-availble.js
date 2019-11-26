module.exports = {


  friendlyName: 'Read all avaible',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

      const vacancyList = await Vacancy.find({ outOfReach: false }).populate('companyName')
        .populate(
        'industryMap', {
          select: ['id']
        })
        .populate(
          'mapPositionsTo', {
          select: ['id', 'name']
        })
        .sort( 'createdAt DESC')
     //console.log('result: ', vacancyList);

      if (vacancyList) return ({ success: true, result: { vacancyList } })
      else return ({ success: false })
    }
};
