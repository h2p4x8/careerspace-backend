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
        index,
        list
      } = req.body;
      if (list) {
        const listLevel = [];

        for (let level in list) {
          let {
            name,
            index
          } = level;
          let data = {
            name,
            index
          }

          listLevel.push(await MapLevel.create(data).fetch())
        }

        //console.log('new: ', listLevel);
        if (listLevel) return res.json({ success: true, result: { listLevel } })
        else return res.json({ success: false })

      } else {
        let data = {
          name,
          index
        }
        const newLevel = await MapLevel.create(data).fetch();
        //console.log('new: ', newLevel);

        if (newLevel) return res.json({ success: true, result: { newLevel } })
        else return res.json({ success: false })
      }
    },

    read: async (req, res) => {
      let levelList;

      levelList = req.params.id ? await MapLevel.findOne({ id: req.params.id }) : await MapLevel.find()

      //console.log('result: ', levelList)
      if (levelList) return res.json({ success: true, result: {levelList} })
      else return res.json({ success: false })
    },

    update: async (req, res) => {
      let {
        name,
        index
      } = req.body;

      let updatedData = {};
      if (name) updatedData.name = name;
      if (index) updatedData.index = index;

      const updatedLevel = await MapLevel.updateOne({ id: req.params.id })
                                                .set(updatedData);

      //console.log('updated : ', updatedLevel);

      if (updatedLevel) return res.json({ success: true, result: { updatedLevel } })
      else return res.json({ success: false })
    },

    delete: async (req, res) => {
      const deletedLevel = await MapLevel.destroyOne({id: req.params.id})

      //console.log('deleted: ', deletedLevel);

      if (deletedLevel) return res.json({ success: true })
      else return res.json({ success: false })
    }


};
