module.exports = {


  friendlyName: 'Add to favrite',


  description: '',


  inputs: {
    vacancyId: {
      type: 'string',
      required: true,
    },
  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req,
          res = this.res;
    const {
      vacancyId
    } = inputs;

    const vacancy = await Vacancy.findOne({ id: vacancyId});
    if (!vacancy) return res.json({ success: false });

    const user = await User.findOne({ id: req.session.passport.user.id });
    if (!user) return res.json({ success: false });

    await User.addToCollection(user.id, 'vacancyFavList').members(vacancy.id)
    res.json({ success: true })
    return;
  }


};
