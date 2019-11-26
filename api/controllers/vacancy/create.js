const uuidv4 = require('uuid/v4');
module.exports = {


  friendlyName: 'Create',


  description: 'Create vacancy.',


  inputs: {
    companyName: {
      type: 'string',
      required: true
    },
    positionName: {
      type: 'string',
      required: true
    },
    city: {
      type: 'string',
      required: true
    },
    salaryFrom: {
      type: 'number',
      required: true
    },
    salaryTo: {
      type: 'number',
      allowNull: true
    },
    duties: {
      type: 'json'
    },
    commentToDuties: {
      type: 'string'
    },
    requirements: {
      type: 'json'
    },
    commentToRequirements: {
      type: 'string'
    },
    reasons: {
      type: 'json'
    },
    commentToReasons: {
      type: 'string'
    },
    extra: {
      type: 'json'
    },
    commentToExtra: {
      type: 'string'
    },
    mapPosition: {
      type: 'string'
    },
    industry: {
      type: 'string'
    },
    mapFunction: {
      type: 'string'
    },
    contact: {
      type: 'number'
    },
    industryMap: {
      type: 'json'
    },
    summary: {
      type: 'string'
    },
    facebookLink: {
      type: 'string'
    },
    formLink: {
      type: 'string'
    },
    mapPositionsTo: {
      type: 'json'
    },
    salaryInfo: {
      type: 'string'
    },
    sharingImage: {
      type: 'json'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    const newVacancy = await Vacancy.create(inputs).fetch();
   //console.log('new: ', newVacancy);

    await Company.addToCollection(inputs.companyName, 'vacancyList').members(newVacancy.id);
    if (inputs.contact) await CompanyContact.addToCollection(inputs.contact, 'vacancyList').members(newVacancy.id);
    if (inputs.mapPosition) await MapPosition.addToCollection(inputs.mapPosition, 'vacancyList').members(newVacancy.id)
    if (inputs.mapPositionsTo) {
      inputs.mapPositionsTo.forEach(el => {
        MapPosition.addToCollection(el, 'vacancyList').members(newVacancy.id)
        Vacancy.addToCollection(newVacancy.id, 'mapPositionsTo').members(el)
      })
    }
    if (inputs.industryMap) {
      inputs.industryMap.forEach(el => {
        Vacancy.addToCollection(newVacancy.id, 'industryMap').members(el)
      })
    }

    if (newVacancy) return ({ success: true, result: { newVacancy } })
    else return ({ success: false })
  }


};
