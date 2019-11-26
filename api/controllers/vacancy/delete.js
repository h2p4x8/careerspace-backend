module.exports = {


  friendlyName: 'Delete',


  description: 'Delete vacancy.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
      const req = this.req;
      const deletedVacancy = await Vacancy.destroyOne({id: req.params.id})

     //console.log('deleted: ', deletedVacancy);

      if (deletedVacancy) return ({ success: true })
      else return ({ success: false })
    }

  };
