module.exports = {


  friendlyName: 'Update',


  description: 'Update vacancy.',


  inputs: {
    companyName: {
      type: 'string',
    },
    positionName: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    salaryFrom: {
      type: 'number',
    },
    salaryTo: {
      type: 'number',
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
    outOfReach: {
      type: 'boolean'
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
  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req;
    const originalVacancy = await Vacancy.findOne({ id: req.params.id }).populate(
      'industryMap', {
        select: ['id']
      }).populate(
        'mapPositionsTo', {
        select: ['id', 'name']
      });
    const updatedVacancy = await Vacancy.updateOne({ id: req.params.id })
                                        .set(inputs);

    if (inputs.companyName) {
      Company.removeFromCollection(originalVacancy.companyName, 'vacancyList').members(originalVacancy.id);
      Company.addToCollection(inputs.companyName, 'vacancyList').members(updatedVacancy.id);
    }

    if (inputs.contact) {
      CompanyContact.removeFromCollection(originalVacancy.contact, 'vacancyList').members(originalVacancy.id);
      CompanyContact.addToCollection(inputs.contact, 'vacancyList').members(updatedVacancy.id);
    }
    if (inputs.mapPosition) {
      MapPosition.removeFromCollection(originalVacancy.mapPosition, 'vacancyList').members(originalVacancy.id);
      MapPosition.addToCollection(inputs.mapPosition, 'vacancyList').members(updatedVacancy.id)
    }
    if (inputs.mapPositionsTo) {
      originalVacancy.mapPositionsTo.forEach(el => {
        Vacancy.removeFromCollection(updatedVacancy.id, 'mapPositionsTo').members(el.id);
      })
      inputs.mapPositionsTo.forEach(el => {
        MapPosition.addToCollection(el.id, 'vacancyList').members(updatedVacancy.id)
        Vacancy.addToCollection(updatedVacancy.id, 'mapPositionsTo').members(el.id)
      })
    }
    if (inputs.industryMap) {
      originalVacancy.industryMap.forEach(el => {
        Vacancy.removeFromCollection(updatedVacancy.id, 'industryMap').members(el.id);
      })
      inputs.industryMap.forEach(el => {
        Vacancy.addToCollection(updatedVacancy.id, 'industryMap').members(el.id)
      })
    }

   //console.log('updated : ', updatedVacancy);
    if (updatedVacancy) return ({ success: true, result: { updatedVacancy } })
    else return ({ success: false })
  }
};
