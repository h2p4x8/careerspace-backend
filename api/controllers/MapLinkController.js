/**
 * MapPositionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create: async (req, res) => {
      let {
        type,
        position_from,
        position_to
      } = req.body;
      let data = {
        type,
        position_from,
        position_to
      };

      const newLink = await MapLink.create(data).fetch();
     //console.log('new: ', newLink);

      if (newLink) return res.json({ success: true, result: { newLink } })
      else return res.json({ success: false })
    },

    read: async (req, res) => {
      let linkList;
      if (req.params.id){
        linkList = await MapLink.find({position_from:req.params.position_from});
        console.log(linkList)
      }
      else {
        linkList = req.params.id ? await MapLink.findOne({ id: req.params.id }) : await MapLink.find()
      }

     //console.log('result: ', linkList)
      if (linkList) return res.json({ success: true, result: {linkList} })
      else return res.json({ success: false })
    },

    readByPosition: async (req, res) => {
      let linkList = await MapLink.find({position_from: req.params.id});
     //console.log('result: ', linkList)
      if (linkList) return res.json({ success: true, result: {linkList} })
      else return res.json({ success: false })
    },

    update: async (req, res) => {
      let {
        type,
        position_from,
        position_to
      } = req.body;

      let updatedData = {};
      if (type) updatedData.type = type;
      if (position_from) updatedData.position_from = position_from;
      if (position_to) updatedData.position_to = position_to;

      const updatedLink = await MapLink.updateOne({ id: req.params.id })
                                                .set(updatedData);

     //console.log('updated : ', updatedLink);

      if (updatedLink) return res.json({ success: true, result: { updatedLink } })
      else return res.json({ success: false })
    },

    delete: async (req, res) => {
      const deletedLink = await MapLink.destroyOne({id: req.params.id})

     //console.log('deleted: ', deletedLink);

      if (deletedLink) return res.json({ success: true })
      else return res.json({ success: false })
    }


};
