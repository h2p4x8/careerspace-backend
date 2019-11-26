module.exports = {


  friendlyName: 'Update by adminpanel',


  description: '',


  inputs: {
    email: {
      type: 'string',
    },
    fullName: {
      type: 'string',
    },
    position: {
      type: 'string',
    },
    company: {
      type: 'string',
    },
    role: {
      type: 'string',
    },
    subscriptionType: {
      type: 'string'
    },
    subscriptionOptions: {
      type: 'json'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    const req = this.req,
          res = this.res;
    const {
      email,
      fullName,
      position,
      company,
      role,
      subscriptionType,
      subscriptionOptions
    } = inputs;

    const newData = {}
    if (email) newData.email = email;
    if (fullName) newData.fullName = fullName;
    if (position) newData.position = position;
    if (company) newData.company = company;
    if (role) newData.role = role;

    if (subscriptionType) {
      const prices = {
        month: {
          period: 1
        },
        year: {
          period: 12
        },
        forever: {
          period: -1
        },
        none: {
          time: null,
          period: 0,
        }
      }

      const period = prices[subscriptionType];


      if (period.period > 0) {
        let date = new Date();

        let res = 0;
        if (subscriptionOptions ? subscriptionOptions.length > 1 : false) {
            subscriptionOptions.forEach((el, index) => {
              if (index === 0) return;
              res += 100 - ( 10 * index);
            })
        };
        if (subscriptionOptions) {
          const pricePerMonth = subscriptionOptions.length > 0 ? (subscriptionOptions.length > 1) ? 100 + res : 100 : 0;
          let price =  pricePerMonth * period.period;
        }
        date.setMonth(date.getMonth() + period.period);
        newData.subscriptionDateTo = date;
        newData.subscriptionStatus = 'active';
        newData.subscriptionPeriod = period.period;
        if (subscriptionOptions) newData.subscriptionPrice = price;
        if (subscriptionOptions ? subscriptionOptions.length > 0 : false) await User.addToCollection(req.params.id, 'subscriptionOptions').members(subscriptionOptions);
      } else if (period.period === 0){
        newData.subscriptionDateTo = null;
        newData.subscriptionStatus = null;
        newData.subscriptionPeriod = null;
        newData.subscriptionPrice = 0;
        await User.replaceCollection(req.params.id, 'subscriptionOptions').members([]);
      } else if (period.period < 0) {
        newData.subscriptionDateTo = null;
        newData.subscriptionStatus = 'active';
        newData.subscriptionPeriod = period.period;
        newData.subscriptionPrice = 21290;
        if (subscriptionOptions ? subscriptionOptions.length > 0 : false) await User.replaceCollection(req.params.id, 'subscriptionOptions').members(subscriptionOptions);
      }
    } else if (subscriptionOptions ? subscriptionOptions.length > 0 : false) {
      let res = 0;
      const userPeriod = await User.findOne({ id: req.params.id });
          subscriptionOptions.forEach((el, index) => {
            if (index === 0) return;
            res += 100 - ( 10 * index);
          })
      const pricePerMonth = subscriptionOptions.length > 0 ? (subscriptionOptions.length > 1) ? 100 + res : 100 : 0;
      let price =  pricePerMonth * userPeriod.subscriptionPeriod;
      newData.subscriptionPrice = price;
      await User.replaceCollection(req.params.id, 'subscriptionOptions').members([]);
      await User.addToCollection(req.params.id, 'subscriptionOptions').members(subscriptionOptions);
    }


    const updatedUser = await User.updateOne({ id: req.params.id }).set(newData);

    if (!updatedUser) return { success: false, result: { message: 'Failed' }};
    return { success: true, result: { updatedUser }};
  }

};
