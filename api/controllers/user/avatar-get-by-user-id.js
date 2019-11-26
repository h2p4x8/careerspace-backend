module.exports = {


  friendlyName: 'Delete',


  description: 'Delete user.',


  inputs: {
    user_id: {
      type: "string",
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    let res = this.res;
    User.findOne(inputs.user_id).exec(function (err, user){
      if (err) return { success: false, result: { message: 'Error!' } };
      if (!user) return { success: false, result: { message: 'User not found' } };
  
      // User has no avatar image uploaded.
      // (should have never have hit this endpoint and used the default image)
      if (!user.avatarFd) {
        return { success: false, result: { message: 'No avatar' } };
      }
  
      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk(/* optional opts */);
  
      // set the filename to the same file as the user uploaded
      res.set("Content-disposition", "attachment; filename='avatar'");
  
      // Stream the file down
      fileAdapter.read(user.avatarFd)
      .on('error', function (err){
        return { success: false, result: { message: 'Error!' } };
      })
      .pipe(res);
    });

  }


};
