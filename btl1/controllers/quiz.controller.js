const Quiz = require("../models/quiz.model");

module.exports = {
  getAll: (req, res) => { Quiz.getAll((result) => { res.send(result); }); },
  getById: (req, res) => {
    const id = req.params.id;
    Quiz.getById(id, (result) => { res.send(result); });
  },

  insert: (req, res) => {
    const data = req.body;
    Quiz.insert(data, (result) => { res.send(result); });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Quiz.update(data, id, (result) => { res.send(result); });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Quiz.delete(id, (result) => { res.send(result); });
  },

};
