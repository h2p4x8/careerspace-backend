module.exports = {


  friendlyName: 'Jobs filter',


  description: '',


  inputs: {
    mapFunction: {
      type: 'json'
    },
    industry: {
      type: 'json'
    },
    typeOfCompany: {
      type: "json"
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    const {
      mapFunction,
      industry,
      typeOfCompany
    } = inputs;

    let where = {
      mapFunction,
      outOfReach: false,
    }

    const companyList = []

    if (industry) {
      const result = await Company.find().populate('industries');
      result.forEach(el => {
        console.log(el)
        if (el.industries.find(ind => industry.some(sInd => sInd === ind.id) )) companyList.push(el.id)
      })
      where.companyName = companyList;
    }

    console.log('where', where)

    let vacancyList = await Vacancy.find({ where }).populate('companyName')
                                                   .sort( 'createdAt DESC');

    if (vacancyList) {
      if (vacancyList.length === 0) {
        if (industry) {
          where = {
            mapFunction,
            outOfReach: false,
          }
          vacancyList = await Vacancy.find({ where }).populate('companyName')
                                                     .sort( 'createdAt DESC');
          let vacancyListInd = [];
          if (companyList.length > 0) {
            vacancyListInd = await Vacancy.find({ companyName: companyList })
                                          .populate('companyName')
                                          .sort( 'createdAt DESC');
          }
          vacancyList = vacancyList.concat(vacancyListInd);
        }
        return ({ success: true, result: { vacancyList }, message: 'no data' })
      } else {
        return ({ success: true, result: { vacancyList } })
      }
    } else return ({ success: false })

  }


};
