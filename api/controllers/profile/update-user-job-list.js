module.exports = {


  friendlyName: 'Read by id',


  description: '',


  inputs: {
    list: {
      type: 'json'
    },
  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req;

    inputs.list.forEach(async el => {
      await UserJob.updateOne({ id: el.id }).set({ order: el.order });
    })

    return ({ success: true })

  }


};
