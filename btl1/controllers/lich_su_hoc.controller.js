const Lich_su_hoc = require("../models/lich_su_hoc.model");

module.exports = {
  getAll: (req, res) => { Lich_su_hoc.getAll((result) => { res.send(result); }); },
  getById: (req, res) => {
    const id = req.params.id;
    Lich_su_hoc.getById(id, (result) => { res.send(result); });
  },

  insert: (req, res) => {
    const data = req.body;
    Lich_su_hoc.insert(data, (result) => { res.send(result); });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Lich_su_hoc.update(data, id, (result) => { res.send(result); });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Lich_su_hoc.delete(id, (result) => { res.send(result); });
  },

};
