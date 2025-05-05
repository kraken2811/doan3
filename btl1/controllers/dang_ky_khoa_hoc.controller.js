const Dang_ky_khoa_hoc = require("../models/dang_ky_khoa_hoc.model");

module.exports = {
  getAll: (req, res) => { Dang_ky_khoa_hoc.getAll((result) => { res.send(result); }); },
  getById: (req, res) => {
    const id = req.params.id;
    Dang_ky_khoa_hoc.getById(id, (result) => { res.send(result); });
  },

  insert: (req, res) => {
    const data = req.body;
    Dang_ky_khoa_hoc.insert(data, (result) => { res.send(result); });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Dang_ky_khoa_hoc.update(data, id, (result) => { res.send(result); });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Dang_ky_khoa_hoc.delete(id, (result) => { res.send(result); });
  },

};
