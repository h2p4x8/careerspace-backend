/**
 * MapIndustryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create: async (req, res) => {
      let {
        name,
        description
      } = req.body;
      let data = {
        name,
        description
      };

      const newIndustry = await MapIndustry.create(data).fetch();
      //console.log('new: ', newIndustry);

      if (newIndustry) return res.json({ success: true, result: { newIndustry } })
      else return res.json({ success: false })
    },

    read: async (req, res) => {

      const industryList = req.params.id ? await MapIndustry.findOne({ id: req.params.id }) : await MapIndustry.find()

      //console.log('result: ', industryList)
      if (industryList) return res.json({ success: true, result: {industryList} })
      else return res.json({ success: false })
    },

    update: async (req, res) => {
      let {
        name,
        description
      } = req.body;

      let updatedData = {};
      if (name) updatedData.name = name;
      if (description) updatedData.description = description;

      const updatedIndustry = await MapIndustry.updateOne({ id: req.params.id })
                                                .set(updatedData);

      //console.log('updated: ', updatedIndustry);

      if (updatedFunction) return res.json({ success: true, result: { updatedFunction } })
      else return res.json({ success: false })
    },

    delete: async (req, res) => {
      const deletedIndustry = await MapIndustry.destroyOne({id: req.params.id})

      //console.log('deleted: ', deletedIndustry);

      if (deletedIndustry) return res.json({ success: true })
      else return res.json({ success: false })
    }
};
