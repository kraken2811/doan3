const db = require("../common/db");

const quiz = (data) => {
  this.id = data.id;
  this.bai_hoc_id = data.bai_hoc_id;
  this.cau_hoi = data.cau_hoi;
  this.dap_an_a = data.dap_an_a;
  this.dap_an_b = data.dap_an_b;
  this.dap_an_c = data.dap_an_c;
  this.dap_an_d = data.dap_an_d;
  this.dap_an_dung = data.dap_an_dung;
};

quiz.getById = (id, callback) => {
  const sqlString = "SELECT * FROM quiz WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

quiz.getAll = (callback) => {
  const sqlString = "SELECT * FROM quiz";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

quiz.insert = (data, callback) => {
  const sqlString = "INSERT INTO quiz SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

quiz.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE quiz SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

quiz.delete = (id, callback) => {
  db.query("DELETE FROM quiz WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = quiz;
