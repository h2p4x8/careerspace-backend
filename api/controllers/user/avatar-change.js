const client = sails.config.storage;
client.authenticate()

module.exports = {


  friendlyName: 'Avatar change',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    const path = require('path');
    const fs = require('fs');
    const req = this.req,
          res = this.res;
    let timestamp = Date.now();
    let filename = `${req.session.passport.user.id}_${timestamp}.jpg`;
    let avatarPath_2 = `${sails.config.appPath}/.tmp/public/avatars/${filename}`;

    const getFile = (req) => {
      return new Promise((resolve, reject) => {
      req.file('avatar').upload({
        // don't allow the total upload size to exceed ~50MB
        maxBytes: 5000000,
        dirname: `${sails.config.appPath}/.tmp/public/avatars/`,
        saveAs: filename
      }, async function whenDone(err, uploadedFiles) {
        if (err) {
          console.log(1)
          return reject(false);
        }

        // If no files were uploaded, respond with an error.
        if (uploadedFiles.length === 0) {
          console.log(2)
          return reject(false);
        }

        // Get the base URL for our deployed application from our custom config
        // (e.g. this might be "http://foobar.example.com:1339" or "https://example.com")
        console.log(uploadedFiles[0].fd);
        return resolve(uploadedFiles[0]);
      });
    })
    }

    file = await getFile(req);

    if (file) {
      const user = await User.find(req.session.passport.user.id)
      const container = client.Container("careerspace");

      if (user.avatarFilename) {
        container.delete(user.avatarFilename)
                 .then(() => {
                   return;
                 })
                 .catch(err => {
                   console.log(err)
                 })
      }
      var baseUrl = sails.config.custom.baseUrl;
      console.log(file.fd);

      const src = fs.createReadStream(file.fd)
      let object = await container.create(filename, src)

      console.log('1', object)

      fs.unlink(file.fd, (err) => {
        if (err) throw err;
        console.log('file was deleted');
      });

      await User.update(req.session.passport.user.id, {
        avatarUrl: `https://cdn.careerspace.app/${filename}`,
        avatarFilename: filename,
      });
      console.log("загрузилось!");
      return {success: true};
    } else {
      return {success: false, result: { message: 'Failed' }}
    }
    return {success: true};
  }
};
