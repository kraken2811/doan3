const Chung_nhan = require("../models/chung_nhan.model");

module.exports = {
  getAll: (req, res) => { Chung_nhan.getAll((result) => { res.send(result); }); },
  getById: (req, res) => {
    const id = req.params.id;
    Chung_nhan.getById(id, (result) => { res.send(result); });
  },

  insert: (req, res) => {
    const data = req.body;
    Chung_nhan.insert(data, (result) => { res.send(result); });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Chung_nhan.update(data, id, (result) => { res.send(result); });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Chung_nhan.delete(id, (result) => { res.send(result); });
  },

};
