const Giao_vien = require("../models/giao_vien.model");

module.exports = {
  getAll: (req, res) => { Giao_vien.getAll((result) => { res.send(result); }); },
  getById: (req, res) => {
    const id = req.params.id;
    Giao_vien.getById(id, (result) => { res.send(result); });
  },

  insert: (req, res) => {
    const data = req.body;
    Giao_vien.insert(data, (result) => { res.send(result); });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Giao_vien.update(data, id, (result) => { res.send(result); });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Giao_vien.delete(id, (result) => { res.send(result); });
  },

};
