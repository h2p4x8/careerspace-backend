module.exports = {


  friendlyName: 'Read all',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    const userList = await User.find({ sort: 'createdAt DESC' }).populate('subscriptionOptions', {select:  ['title' ]});

    if (!userList) return { success: false, result: { message: 'Failed' }};

    return { success: true, result: { userList }}

  }


};
