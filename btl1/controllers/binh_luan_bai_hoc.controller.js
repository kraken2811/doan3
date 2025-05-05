const Binh_luan_bai_hoc = require("../models/binh_luan_bai_hoc.model");

module.exports = {
  getAll: (req, res) => { Binh_luan_bai_hoc.getAll((result) => { res.send(result); }); },
  getById: (req, res) => {
    const id = req.params.id;
    Binh_luan_bai_hoc.getById(id, (result) => { res.send(result); });
  },

  insert: (req, res) => {
    const data = req.body;
    Binh_luan_bai_hoc.insert(data, (result) => { res.send(result); });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Binh_luan_bai_hoc.update(data, id, (result) => { res.send(result); });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Binh_luan_bai_hoc.delete(id, (result) => { res.send(result); });
  },

};
