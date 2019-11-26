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
        shortDescription,
        fullDescription,
        timeStart,
        timeEnd,
        salaryStart,
        salaryEnd,
        level_id,
        subfunction_id,
        branch_id
      } = req.body;
      let data = {
        name,
        shortDescription,
        fullDescription,
        timeStart,
        timeEnd,
        salaryStart,
        salaryEnd,
        level_id,
        subfunction_id,
        branch_id,
      };

      const newPosition = await MapPosition.create(data).fetch();
     //console.log('new position: ', newPosition);

      if (newPosition) return res.json({ success: true, result: { newPosition } })
      else return res.json({ success: false })
    },

    read: async (req, res) => {
      let positionList;

      positionList = req.params.id ? await MapPosition.findOne({ id: req.params.id }) : await MapPosition.find()

      if (positionList) return res.json({ success: true, result: {positionList} })
      else return res.json({ success: false })
    },

    update: async (req, res) => {
      let {
        name,
        shortDescription,
        fullDescription,
        timeStart,
        timeEnd,
        salaryStart,
        salaryEnd,
        level_id,
        subfunction_id,
        branch_id
      } = req.body;

      let updatedData = {};
      if (name) updatedData.name = name;
      if (shortDescription) updatedData.shortDescription = shortDescription;
      if (fullDescription) updatedData.fullDescription = fullDescription;
      if (timeStart) updatedData.timeStart = timeStart;
      if (timeEnd) updatedData.timeEnd = timeEnd;
      if (salaryStart) updatedData.salaryStart = salaryStart;
      if (salaryEnd) updatedData.salaryEnd = salaryEnd;
      if (level_id) updatedData.level_id = level_id;
      if (subfunction_id) updatedData.subfunction_id = subfunction_id;
      if (branch_id) updatedData.branch_id = branch_id;

      const updatedPosition = await MapPosition.updateOne({ id: req.params.id })
                                                .set(updatedData);

     //console.log('updated position: ', updatedPosition);

      if (updatedPosition) return res.json({ success: true, result: { updatedPosition } })
      else return res.json({ success: false })
    },

    delete: async (req, res) => {
      const deletedPosition = await MapPosition.destroyOne({id: req.params.id})

     //console.log('deleted position: ', deletedPosition);

      if (deletedPosition) return res.json({ success: true })
      else return res.json({ success: false })
    },

    readByFunction: async (req, res) => {
      let positionList;

      positionList = req.params.id ? await MapPosition.findOne({ id: req.params.id }) : await MapPosition.find()

      if (positionList) return res.json({ success: true, result: {positionList} })
      else return res.json({ success: false })
    },
};
