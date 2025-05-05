const Don_hang = require("../models/don_hang.model");

module.exports = {
  getAll: (req, res) => { Don_hang.getAll((result) => { res.send(result); }); },
  getById: (req, res) => {
    const id = req.params.id;
    Don_hang.getById(id, (result) => { res.send(result); });
  },

  insert: (req, res) => {
    const data = req.body;
    Don_hang.insert(data, (result) => { res.send(result); });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Don_hang.update(data, id, (result) => { res.send(result); });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Don_hang.delete(id, (result) => { res.send(result); });
  },

};
