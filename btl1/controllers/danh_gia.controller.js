const Danh_gia = require("../models/danh_gia.model");

module.exports = {
  getAll: (req, res) => { Danh_gia.getAll((result) => { res.send(result); }); },
  getById: (req, res) => {
    const id = req.params.id;
    Danh_gia.getById(id, (result) => { res.send(result); });
  },

  insert: (req, res) => {
    const data = req.body;
    Danh_gia.insert(data, (result) => { res.send(result); });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Danh_gia.update(data, id, (result) => { res.send(result); });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Danh_gia.delete(id, (result) => { res.send(result); });
  },

};
