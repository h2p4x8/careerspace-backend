/**
 * VacancyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

/*module.exports = {

  create: async (req, res) => {
    const {
      companyName,
      positionName,
      city,
      salaryFrom,
      salaryTo,
      duties,
      commentToDuties,
      requirements,
      commentToRequirements,
      reasons,
      commentToReasons,
      extra,
      commentToExtra,
      outOfReach,
      industry,
      mapPosition,
      mapFunction,
      contact
    } = req.body;
    const data = {
      companyName,
      positionName,
      city,
      salaryFrom,
      salaryTo,
      duties,
      commentToDuties,
      requirements,
      commentToRequirements,
      reasons,
      commentToReasons,
      extra,
      commentToExtra,
      outOfReach,
    }

    const mapIndustry = await MapIndustry.findOne({ name: industry })
    if (mapIndustry) data.industry = mapIndustry.id;

    const position = await MapPosition.findOne({ name: mapPosition })
    if (position) data.mapPosition = position.id;

    const functionInMap = await MapFunction.findOne({ name: mapFunction })
    if (functionInMap) data.mapFunction = functionInMap.id;

    let vacancyContact = await VacancyContact.findOne({ name: contact.name });
    if (!vacancyContact) {
      vacancyContact = await VacancyContact.create(contact).fetch()
    }
    data.contact = vacancyContact.id;

    const newVacancy = await Vacancy.create(data).fetch();
   //console.log('new: ', newVacancy);



    if (newVacancy) return res.json({ success: true, result: { newVacancy } })
    else return res.json({ success: false })
  },

  read: async (req, res) => {
    let vacancyList;
   //console.log('useeer ', req.user)
    //vacancyList = req.params.id ? await Vacancy.findOne({ id: req.params.id }) :

    if (req.params.id) {
      vacancyList = await Vacancy.findOne({ id: req.params.id });
      if (vacancyList) {
        const vacancyContact = await VacancyContact.findOne({ id: vacancyList.contact });
        vacancyList.contact = vacancyContact;
      }
    } else {
      vacancyList = await Vacancy.find();
      if (vacancyList) {
        vacancyList.forEach( async el => {
        const vacancyContact = await VacancyContact.findOne({ id: el.contact })
        el.contact = vacancyContact;
      })
      }
    }
    if (vacancyList) return res.json({ success: true, result: { vacancyList } })
    else return res.json({ success: false })
  },

  readAvailble: async (req, res) => {
    let vacancyList;

    vacancyList = await Vacancy.find({ outOfReach: false });
   //console.log('result: ', vacancyList);

    if (vacancyList) return res.json({ success: true, result: { vacancyList } })
    else return res.json({ success: false })
  },

  update: async (req, res) => {
    const {
      companyName,
      positionName,
      city,
      salaryFrom,
      salaryTo,
      duties,
      commentToDuties,
      requirements,
      commentToRequirements,
      reasons,
      commentToReasons,
      extra,
      commentToExtra,
      outOfReach,
      industry,
      mapPosition,
      mapFunction,
      contact
    } = req.body;

    let updatedData = {};
    if (companyName) updatedData.companyName = companyName;
    if (positionName) updatedData.positionName = positionName;
    if (city) updatedData.city = city;
    if (salaryFrom) updatedData.salaryFrom = salaryFrom;
    if (salaryTo) updatedData.salaryTo = salaryTo;
    if (duties) updatedData.duties = duties;
    if (commentToDuties) updatedData.commentToDuties = commentToDuties;
    if (requirements) updatedData.requirements = requirements;
    if (commentToRequirements) updatedData.commentToRequirements = commentToRequirements;
    if (reasons) updatedData.reasons = reasons;
    if (commentToReasons) updatedData.commentToReasons = commentToReasons;
    if (extra) updatedData.extra = extra;
    if (commentToExtra) updatedData.commentToExtra = commentToExtra;
    if (industry) {
      const mapIndustry = await MapIndustry.findOne({ name: industry })
      if (mapIndustry) updatedData.industry = mapIndustry.id;
    }
    if (mapPosition) {
      const position = await MapPosition.findOne({ name: mapPosition })
      if (position) updatedData.mapPosition = position.id;
    }
    if (mapFunction) {
      const functionInMap = await MapPosition.findOne({ name: mapFunction })
      if (functionInMap) updatedData.mapFunction = functionInMap.id;
    }
    if (typeof outOfReach !=='undefined') updatedData.outOfReach = outOfReach;
    if (contact) {
      let vacancyContact = await VacancyContact.findOne({ name: contact.name})
      if (!vacancyContact) vacancyContact = await VacancyContact.create(contact).fetch();
      updatedData.contact = vacancyContact.id;
    }

    const updatedVacancy = await Vacancy.updateOne({ id: req.params.id })
                                              .set(updatedData);
   //console.log('updated : ', updatedVacancy);
    if (updatedVacancy) return res.json({ success: true, result: { updatedVacancy } })
    else return res.json({ success: false })
  },

  delete: async (req, res) => {
    const deletedVacancy = await Vacancy.destroyOne({id: req.params.id})

   //console.log('deleted: ', deletedVacancy);

    if (deletedVacancy) return res.json({ success: true })
    else return res.json({ success: false })
  }

};*/
