const client = sails.config.storage;
client.authenticate()

module.exports = {


  friendlyName: 'Create',


  description: 'Create cv.',


  inputs: {
    name: {
      type: 'string'
    },
    fullName:{
      type: 'string'
    },
    livingPlace: {
      type: 'string'
    },
    age: {
      type: 'number'
    },
    phone: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    summary: {
      type: 'string'
    },
    careerHistory: {
      type: 'json'
    },
    education: {
      type: 'json'
    },
    extra: {
      type: 'json'
    },
    order: {
      type: 'json'
    },
  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req,
          res = this.res;
    const cv = await CurriculumVitae.findOne({ id: req.params.id });
    const result = await CurriculumVitae.updateOne({ id: req.params.id }).set(inputs);
    const container = client.Container("careerspace-dev");

    let object = await container.delete(cv.filename)
    const cvPdf = await sails.helpers.makePdfCv1.with({
        cvId: result.id,
        userId: req.session.passport.user.id,
    });
    if (cvPdf) return { success: true, result }


    return { success: false, result: { message: 'Failed' }};
    }


  };
