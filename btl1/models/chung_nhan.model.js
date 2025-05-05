const db = require("../common/db");

const chung_nhan = (data) => {
  this.id = data.id;
  this.user_id = data.user_id;
  this.khoa_hoc_id = data.khoa_hoc_id;
  this.ngay_cap = data.ngay_cap;
};

chung_nhan.getById = (id, callback) => {
  const sqlString = "SELECT * FROM chung_nhan WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

chung_nhan.getAll = (callback) => {
  const sqlString = "SELECT * FROM chung_nhan";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

chung_nhan.insert = (data, callback) => {
  const sqlString = "INSERT INTO chung_nhan SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

chung_nhan.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE chung_nhan SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

chung_nhan.delete = (id, callback) => {
  db.query("DELETE FROM chung_nhan WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = chung_nhan;
