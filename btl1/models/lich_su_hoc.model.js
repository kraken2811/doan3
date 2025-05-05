const db = require("../common/db");

const lich_su_hoc = (data) => {
  this.id = data.id;
  this.user_id = data.user_id;
  this.bai_hoc_id = data.bai_hoc_id;
  this.trang_thai = data.trang_thai;
  this.ngay_cap_nhat = data.ngay_cap_nhat;
};

lich_su_hoc.getById = (id, callback) => {
  const sqlString = "SELECT * FROM lich_su_hoc WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

lich_su_hoc.getAll = (callback) => {
  const sqlString = "SELECT * FROM lich_su_hoc";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

lich_su_hoc.insert = (data, callback) => {
  const sqlString = "INSERT INTO lich_su_hoc SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

lich_su_hoc.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE lich_su_hoc SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

lich_su_hoc.delete = (id, callback) => {
  db.query("DELETE FROM lich_su_hoc WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = lich_su_hoc;
