const db = require("../common/db");

const khoa_hoc = (data) => {
  this.id = data.id;
  this.ten_khoa_hoc = data.ten_khoa_hoc;
  this.mo_ta = data.mo_ta;
  this.gia = data.gia;
  this.trang_thai = data.trang_thai;
  this.created_at = data.created_at;
  this.updated_at = data.updated_at;
};

khoa_hoc.getById = (id, callback) => {
  const sqlString = "SELECT * FROM khoa_hoc WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

khoa_hoc.getAll = (callback) => {
  const sqlString = "SELECT * FROM khoa_hoc";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

khoa_hoc.insert = (data, callback) => {
  const sqlString = "INSERT INTO khoa_hoc SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

khoa_hoc.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE khoa_hoc SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

khoa_hoc.delete = (id, callback) => {
  db.query("DELETE FROM khoa_hoc WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = khoa_hoc;
