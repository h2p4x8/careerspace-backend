const client = sails.config.storage;

client.authenticate()


module.exports = {


  friendlyName: 'Make reply',


  description: '',


  inputs: {
    cv: {
      type: 'number'
    },
    fullName: {
      type: 'string'
    },
    coveringLetter: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    let req = this.req;
    var fs = require('fs');


    const user = await User.findOne({ id: req.session.passport.user.id }).populate('vacancyReplyList');

    console.log('inputs: ', inputs);
    console.log('body', req.body);
    //console.log('file:', req.file("file"));
    let file;
    let fileFd;
    let dstStream;
    if ( req.body.cv ) {
      const resume = await CurriculumVitae.findOne({ user: req.session.passport.user.id, id: req.body.cv })
      let container = client.Container("careerspace")
      let object = container.Object(resume.filename)
      let cvPath_1 = `${sails.config.appPath}/tmp/Резюме-${user.fullName ? user.fullName : inputs.fullName}.pdf`
      dstStream = fs.createWriteStream(cvPath_1)
      object.write(dstStream);
      fileFd = cvPath_1;
    } else {
      const getFile = (req) => {
      return new Promise((resolve, reject) => {
        req.file('file').upload({
          // don't allow the total upload size to exceed ~50MB
          maxBytes: 5000000,
          saveAs: `Резюме-${user.fullName ? user.fullName : inputs.fullName}.pdf`,
          dirname: require('path').resolve(sails.config.appPath, `tmp`),
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
    }


    const userInfo = {
      fullName: user.fullName ? user.fullName : inputs.fullName,
      email: user.email,
      coveringLetter: inputs.coveringLetter,
    };

    const vacancy = await Vacancy.findOne({ id: req.params.id }).populate('contact').populate('companyName')
    const reply = await VacancyReply.create({ user: user.id, vacancy: vacancy.id }).fetch()
    const vacancyInfo = {
      email: vacancy.contact.email,
      contactName: vacancy.contact.name,
      position: vacancy.positionName,
      companyName: vacancy.companyName.name,
    };

    //console.log('vacancyInfo', vacancyInfo);
    let letterToCompany;

    if ( req.body.cv ) {
      dstStream.on('finish', async () => {
        letterToCompany = await sails.helpers.sendLetterToACompany.with({
          userInfo,
          vacancyInfo,
          attachment: fileFd,
        });
        if (letterToCompany.success) {
          fs.unlink(fileFd, (err) => {
            if (err) throw err;
            console.log('file was deleted');
          })
        }
      });
    } else {
       letterToCompany = await sails.helpers.sendLetterToACompany.with({
        userInfo,
        vacancyInfo,
        attachment: file.fd,
      });
    }

    const letterToUser = await sails.helpers.sendLetterToAUser.with({
      userInfo,
      vacancyInfo
    });

    if (letterToUser.success) {
      await User.addToCollection(user.id, 'vacancyReplyList').members(reply.id);
      await Vacancy.addToCollection(vacancy.id, 'replyList').members(reply.id);
      if (file) fs.unlinkSync(file.fd);

      return { success: true }
    } else {
      return { success: false }
    }

  }


};
