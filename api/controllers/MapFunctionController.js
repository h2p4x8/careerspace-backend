/**
 * MapPositionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create: async (req, res) => {
      let {
        name,
        description,
        showinMap
      } = req.body;
      let data = {
        name,
        description,
        showinMap
      };

      const newFunction = await MapFunction.create(data).fetch();
      //console.lognew: ', newFunction);

      if (newFunction) return res.json({ success: true, result: { newFunction } })
      else return res.json({ success: false })
    },

    read: async (req, res) => {
      let functionList;

      functionList = req.params.id ? await MapFunction.findOne({ id: req.params.id }).populate('subfunctionList') : await MapFunction.find().populate('subfunctionList')

      //console.logresult: ', functionList)
      if (functionList) return res.json({ success: true, result: {functionList} })
      else return res.json({ success: false })
    },

    readAllAvaible: async (req, res) => {
      let functionList;

      functionList = await MapFunction.find({ showinMap: true }).populate('subfunctionList');

      //console.logresult: ', functionList)
      if (functionList) return res.json({ success: true, result: {functionList} })
      else return res.json({ success: false })
    },

    update: async (req, res) => {
      let {
        name,
        description,
        showinMap
      } = req.body;

      let updatedData = {
        name,
        description,
        showinMap
      };

      const updatedFunction = await MapFunction.updateOne({ id: req.params.id })
                                                .set(updatedData);

      //console.logupdated : ', updatedFunction);

      if (updatedFunction) return res.json({ success: true, result: { updatedFunction } })
      else return res.json({ success: false })
    },

    delete: async (req, res) => {
      const deletedFunction = await MapFunction.destroyOne({id: req.params.id})

      //console.log('deleted: ', deletedFunction);

      if (deletedFunction) return res.json({ success: true })
      else return res.json({ success: false })
    }


};
