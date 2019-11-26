module.exports = {


  friendlyName: 'Get user replies',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
      const req = this.req,
            res = this.res;

      const replyList = await VacancyReply.find({ user: req.session.passport.user.id });

      if (!replyList) return { success: false, result: { message: 'User not found' }};

      return {
        success: true,
        result: { replyList: replyList }
      };

  }


};
