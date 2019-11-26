module.exports = {


  friendlyName: 'Make reply',


  description: '',


  inputs: {
  },


  exits: {

  },


  fn: async function (inputs) {
    let req = this.req;

    const vacancyInfo = {
      id: req.params.id,
      answer: req.body,
    }

    const letterToCompany = await sails.helpers.sendAnswerFromCompany.with({
      vacancyInfo,
    });

    return;

  }


};
