var fonts = {
  Roboto: {
    normal: `${sails.config.appPath}/assets/fonts/OpenSans-Regular.ttf`,
    bold: `${sails.config.appPath}/assets/fonts/OpenSans-Semibold.ttf`,
    italics: `${sails.config.appPath}/assets/fonts/OpenSans-Italic.ttf`,
    bolditalics: `${sails.config.appPath}/assets/fonts/OpenSans-BoldItalic.ttf`
  }
};

var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
const uuidv4 = require('uuid/v4');
var fs = require('fs');
const client = sails.config.storage;
client.authenticate()


module.exports = {


  friendlyName: 'Make pdf cv',


  description: '',


  inputs: {
    cvId: {
      type: 'number',
    },
    userId: {
      type: 'number'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {


    const resume = await CurriculumVitae.findOne({ id: inputs.cvId, user: inputs.userId });

    const content = [];

    content.push({columns :[{
      text: resume.fullName,
      style: 'name',
      width: '*',
    },
    {
      svg: '<svg width="22" height="33" viewBox="0 0 22 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.162 18.4194C17.9527 13.4035 16.867 6.92927 10.9363 1C5.00565 6.92927 4.00063 13.4035 4.8044 18.4194M17.162 18.4194C22.2292 21.8065 21.4432 25.9677 19.5405 31C19.1151 29.0645 17.5853 25.0968 14.8692 24.7097M17.162 18.4194C16.7571 20.9884 15.8598 23.1749 14.8692 24.7097M14.8692 24.7097C14.6372 25.0692 14.4 25.3929 14.1628 25.6774H7.70977C7.48842 25.3929 7.26475 25.0692 7.04414 24.7097M4.8044 18.4194C-0.35673 21.8065 0.718782 26.6452 2.33212 31C2.86982 28.5806 3.93038 25.871 7.04414 24.7097M4.8044 18.4194C5.21607 20.9884 6.10224 23.1749 7.04414 24.7097M10.9362 11.1613C7.1719 11.1613 7.23568 17 11 17C14.7643 17 14.7005 11.1613 10.9362 11.1613Z" stroke="#009954"/></svg>',
      style:'rightSide',
    }]});
    content.push('\n');

    if (resume.livingPlace) {
      const infoColumns = {
        columns: []
      };
      infoColumns.columns.push({
        width: 160,
        text: 'Место проживания:',
        style: 'personalInfoTitle'
      });
      infoColumns.columns.push({
        width: '*',
        text: resume.livingPlace,
        style: 'simpleText'
      });
      content.push(infoColumns)
    }
    if (resume.phone) {
      const infoColumns = {
        columns: []
      };
      infoColumns.columns.push({
        width: 160,
        text: 'Телефон:',
        style: 'personalInfoTitle'
      });
      infoColumns.columns.push({
        width: '*',
        text: resume.phone,
        style: 'simpleText'
      });
      content.push(infoColumns)
    };
    if (resume.email) {
      const infoColumns = {
        columns: []
      };
      infoColumns.columns.push({
        width: 160,
        text: 'Email:',
        style: 'personalInfoTitle'
      });
      infoColumns.columns.push({
        width: '*',
        text: resume.email,
        style: 'simpleText'
      });
      content.push(infoColumns)
    };
    if (resume.age) {
      const infoColumns = {
        columns: []
      };
      infoColumns.columns.push({
        width: 160,
        text: 'Возраст:',
        style: 'personalInfoTitle'
      });
      infoColumns.columns.push({
        width: '*',
        text: resume.age,
        style: 'simpleText'
      });
      content.push(infoColumns)
    };

    if (resume.summary) {
      content.push('\n');
      content.push({
        text: resume.summary,
        style: 'summary'
      })
    }

    if (resume.careerHistory.length > 0) {
      content.push({
        text: 'Опыт работы',
        style: 'resumeTitle',
        margin: [0, 20, 0, 0]
      });
      content.push ({
        image: `${sails.config.appPath}/assets/images/line-green.png`,
        width: 500,
        margin: [0, 0, 0, 10]
      });
      for (let el of resume.careerHistory) {
      const column = [];
      console.log(el)
      const timeColumn = {
        width: 100,
        text: el.dataStyle === 'year' ? `${el.yearFrom}-\n${el.yearTo}` : `${el.monthFrom}/${el.yearFrom}-\n${el.monthTo}/${el.yearTo}`,
        style: 'mainData',
        margin: resume.careerHistory.findIndex(elF => el.company === elF.company) === 0 ? [0, 0, 0, 0] : [0, 15, 0, 0],
      }
      column.push(timeColumn);
      const companyColumn = [
        {
          text: el.company,
          style: 'companyName',
          margin: resume.careerHistory.findIndex(elF => el.company === elF.company) === 0 ? [0, 0, 0, 0] : [0, 15, 0, 0],
        },
        {
          text: el.companyDescription,
          style: 'companyDescription',
        }
      ];
      column.push(companyColumn);
      content.push({ columns: column })
      for (let position of el.positions) {
        const column = [];
        const timeColumn = {
          width: 100,
          text: position.dataStyle === 'year' ? `${position.yearFrom}-\n${position.yearTo}` : `${position.monthFrom}/${position.yearFrom}-\n${position.monthTo}/${position.yearTo}`,
          style: 'positionData',
          margin: [0, 15, 0, 10]
        }
        column.push(timeColumn);
        const companyColumn = [
          {
            text: position.positionName,
            style: 'positionName',
            margin: [0, 15, 0, 10]
          },
        ];
        if (position.duties.length > 0) {
          companyColumn.push({text: 'Обязанности:', style: 'simpleText', headlineLevel: 1, margin: [0, 0, 0, 5]});
          //companyColumn.push('\n');
          const pointsDuties = [];
          for (let el of position.duties) {
            pointsDuties.push({
              text: el,
              headlineLevel: 1,
              margin: [0, 0, 0, 5]
            })
          }
          console.log(pointsDuties)
          companyColumn.push({
            markerColor: '#009954',
            ul: pointsDuties,
            style: 'simpleText',
            margin: position.progress.length === 0 ? [0, 0, 0, 0] : [0, 0, 0, 10]
          });
        };

        if (position.progress.length > 0) {
          companyColumn.push({text: 'Достижения:', style: 'simpleText', headlineLevel: 1, margin: [0, 0, 0, 5]})
          //companyColumn.push('\n');
          const pointsProgress = [];
          for (let el of position.progress) {
            pointsProgress.push({
              text: el,
              headlineLevel: 1,
              margin: [0, 0, 0, 5]
            })
          }
          console.log(pointsProgress)
          companyColumn.push({
            markerColor: '#009954',
            ul: pointsProgress,
            style: 'simpleText',
            margin: [0, 0, 0, 0]
          });
        };

        column.push(companyColumn);
        content.push({ columns: column })
        //content.push('\n');
      }
    }
    }

    if (resume.education ? resume.education.length > 0 : false) {
      content.push({
        text: 'Образование',
        style: 'resumeTitle',
        headlineLevel: 1,
        margin: [0, 20, 0, 0]

      });
      content.push ({
        image: `${sails.config.appPath}/assets/images/line-green.png`,
        width: 500,
        margin: [0, 0, 0, 10],
        headlineLevel: 1,
      });
      for (let el of resume.education) {

      const educationColumn = {
        columns: [
            {
              width: 100,
              text: el.dataStyle === 'year' ? `${el.yearFrom}-${el.yearTo}` : `${el.monthFrom}/${el.yearFrom}-\n${el.monthTo}/${el.yearTo}`,
              style: 'positionData',
               margin: [0, 0, 0, 5]
            },
            {
              width: '*',
              style: 'simpleText',
              text: [
                {text: `${el.educationalInstitution}, `, bold: true},
                {text: `${el.educationalDegree}, `},
                {text: `${el.direction}.`}
              ],
               margin: [0, 0, 0, 5]
            },
        ]
      };
      content.push(educationColumn)
      //content.push('\n');
    }
    }

    if (Object.keys(resume.extra).length > 0) {
      content.push({
        text: 'Дополнительная информация',
        style: 'resumeTitle',
        headlineLevel: 1,
        margin: [0, 20, 0, 0]
      });
      content.push ({
        image: `${sails.config.appPath}/assets/images/line-green.png`,
        width: 500,
        margin: [0, 0, 0, 10]
      });
      if (resume.extra.languages.length > 0) {
        const languages = { columns: [
          {
            width: 100,
            text: 'Языки',
            style: 'extraTitle'
          },
          {
            text: resume.extra.languages,
            style: 'simpleText'
          }
        ]
      };
      content.push(languages);
      content.push('\n');
    };
      if (resume.extra.skills.length > 0) {
        const skills = { columns: [
          {
            width: 100,
            text: 'Технические \n навыки',
            style: 'extraTitle'
          },
          {
            text: resume.extra.skills,
            style: 'simpleText'
          }
        ]
      };
      content.push(skills);
      content.push('\n');
    };
    if (resume.extra.curses.length > 0) {
      const skills = { columns: [
        {
          width: 100,
          text: 'Курсы',
          style: 'extraTitle'
        },
        {
          markerColor: '#009954',
          ul: resume.extra.curses,
          style: 'simpleText'
        }
      ]
    };
    content.push(skills);
    content.push('\n');
    }
    if (resume.extra.hobbies.length > 0) {
      const curses = { columns: [
        {
          width: 100,
          text: 'Хобби',
          style: 'extraTitle'
        },
        {
          text: resume.extra.hobbies,
          style: 'simpleText'
        }
      ]
    };
    content.push(curses);
    content.push('\n');
    }
  };
    //console.log(content)
    var docDefinition = {
      content: content,
      styles: {
        name: {
          fontSize: 21,
			    bold: true,
          color: '#009954'
        },
        summary: {
          fontSize: 11,
        },
        personalInfoTitle: {
          fontSize: 10,
			    bold: true,
        },
        resumeTitle: {
          fontSize: 14,
          color: '#009954',
          bold: true,
        },
        mainData: {
          fontSize: 11,
          bold: true,
        },
        companyName: {
          fontSize: 12,
          bold: true,
        },
        companyDescription: {
          fontSize: 9,
        },
        positionData: {
          fontSize: 11,
        },
        positionName: {
          fontSize: 12,
        },
        simpleText: {
          fontSize: 10
        },
        extraTitle: {
          fontSize: 10,
          bold: true,
        },
        rightSide: {
          alignment: 'right'
        }
      },
      pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
        return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 1;
      },
      /*header: function(currentPage, pageCount, pageSize) {
        if (currentPage === 1) {
          return {
            image: `${sails.config.appPath}/assets/images/Smallogo.png`,
            width: 15,
            style:'rightSide',
            margin: [0, 23, 23, 0]
          }
        }
      }*/

    };

    let filename = `${uuidv4()}.pdf`;
    let cvPath_1 = `${sails.config.appPath}/.tmp/${filename}`
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    const container = client.Container("careerspace");

    const str = fs.createWriteStream(cvPath_1);
    pdfDoc.pipe(str);
    pdfDoc.end();
    const src =  fs.createReadStream(cvPath_1)
    let object = await container.create(filename, src)
    if (object) {
      fs.unlink(cvPath_1, (err) => {
          if (err) throw err;
          console.log('file was deleted');
      });
    }
    if (object&&cvPdf) return {success: true}
    else return {success: false}
  }

}
