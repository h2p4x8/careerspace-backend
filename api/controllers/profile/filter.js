module.exports = {


  friendlyName: 'Jobs filter',


  description: '',


  inputs: {
    functions: {
      type: 'json'
    },
    industry: {
      type: 'json'
    },
  },


  exits: {

  },


  fn: async function (inputs) {
    const {
      functions,
      industry,
    } = inputs;

    const where = {
      readyToMeeting: true,
    }

    if (this.req.session.passport.user ? this.req.session.passport.user.id : false) {
      where.user = { '!=': [this.req.session.passport.user.id] }
    }

    const industryMap = [];
    const functionMap = [];

    if (industry) {
       const result = await MapIndustry.find({
        where:  {
          id : industry
         },
        select: [ 'id' ]
      })
      result.forEach(el => {
        industryMap.push(el.id)
      })
    }
    if (functions) {
       const result = await MapFunction.find({
        where:  {
          id : functions
         },
        select: [ 'id' ]
      })
      result.forEach(el => {
        functionMap.push(el.id)
      })
    }

    let profileList = await UserProfile.find({ where: where, sort: 'createdAt DESC' })
                                                       .populate('industry')
                                                       .populate('user')
                                                       .populate('jobList')
                                                       .populate('functions')
                                                       .sort( 'createdAt DESC');

    if (profileList) {
      console.log(profileList)
      if (industryMap.length > 0||functionMap.length > 0) {
        profileList = profileList.filter(el => {
          if ((industryMap.length > 0 ? el.industry.find(elem => industryMap.find(element => element === elem.id)) : true )&&(functionMap.length > 0 ? el.functions.find(elem => functionMap.find(element => element === elem.id)) : true)) {
            return el;
          }
        })
      }
      if (profileList.length === 0) {
        profileList = await UserProfile.find({ where }).populate('industry')
                                                       .populate('user')
                                                       .populate('jobList')
                                                       .populate('functions')
                                                       .sort( 'createdAt DESC');
        profileList = profileList.filter(el => {
            if (el.industry.find(elem => industryMap.find(element => element === elem.id))) return el;
            if (el.functions.find(elem => functionMap.find(element => element === elem.id))) return el;
        })
        return ({ success: true, result: { profileList }, message: 'no data' })
      } else {
        return ({ success: true, result: { profileList } })
      }
    } else return ({ success: false })

  }


};
