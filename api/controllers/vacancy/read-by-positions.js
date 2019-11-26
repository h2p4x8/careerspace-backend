module.exports = {


  friendlyName: 'Read by positions',


  description: '',


  inputs: {
    idPositionList: {
      type: 'json'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    const vacancyListSet = new Set();
    let vacancy = await Vacancy.find().populate('companyName').populate('mapPositionsTo');

    vacancy.forEach(el => {
      if (el.mapPositionsTo.some( pos => inputs.idPositionList.find(id => id === pos.id))) {
         vacancyListSet.add(el)
      }
    })

    const vacancyList = Array.from(vacancyListSet);
    if (vacancyList) return ({ success: true, result: { vacancyList } })
    else return ({ success: false })
  }



};
