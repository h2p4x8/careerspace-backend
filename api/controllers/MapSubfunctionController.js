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
        function_id
      } = req.body;
      let data = {
        name,
        description,
        function_id
      };

      const newSubfunction = await MapSubfunction.create(data).fetch();
     //console.log('new: ', newSubfunction);
      await MapFunction.addToCollection(function_id, 'subfunctionList').members(newSubfunction.id);

      if (newSubfunction) return res.json({ success: true, result: { newSubfunction } })
      else return res.json({ success: false })
    },

    read: async (req, res) => {
      let subfunctionList;

      subfunctionList = req.params.id ? await MapSubfunction.findOne({ id: req.params.id }).populate('branchList') : await MapSubfunction.find().populate('branchList')

     //console.log('result: ', subfunctionList)
      if (subfunctionList) return res.json({ success: true, result: {subfunctionList} })
      else return res.json({ success: false })
    },

    update: async (req, res) => {
      let {
        name,
        description,
        function_id
      } = req.body;

      let updatedData = {};
      if (name) updatedData.name = name;
      if (description) updatedData.description = description;
      if (function_id) {
        updatedData.function_id = function_id;
        const oldFunction = await MapSubfunction.findOne({ id: req.params.id });
        await MapFunction.removeFromCollection(oldFunction.function_id, 'subfunctionList').members(req.params.id)
      }

      const updatedSubfunction = await MapSubfunction.updateOne({ id: req.params.id })
                                                .set(updatedData);

      if (function_id) await MapFunction.addToCollection(function_id, 'subfunctionList').members(updatedSubfunction.id)

     //console.log('updated : ', updatedSubfunction);

      if (updatedSubfunction) return res.json({ success: true, result: { updatedSubfunction } })
      else return res.json({ success: false })
    },

    delete: async (req, res) => {
      const deletedsubfunction = await MapSubfunction.destroyOne({id: req.params.id})

     //console.log('deleted: ', deletedsubfunction);

      if (deletedsubfunction) return res.json({ success: true })
      else return res.json({ success: false })
    }


};
