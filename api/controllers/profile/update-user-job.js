module.exports = {


  friendlyName: 'Read by id',


  description: '',


  inputs: {
    positionName: {
      type: 'string'
    },
    companyName: {
      type: 'string'
    },
    functions: {
      type: 'json'
    },
    industry: {
      type: 'json'
    },
    order: {
      type: 'number'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req;

    const job = await UserJob.updateOne({ id: req.params.id }).set(inputs);

    if (inputs.industry) await UserJob.addToCollection(job.id, 'industry').members(inputs.industry);
    if (inputs.functions) await UserJob.addToCollection(job.id, 'functions').members(inputs.functions);

    if (job) return ({ success: true })
    else return ({ success: false })

  }


};
