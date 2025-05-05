const db = require("../common/db");

const danh_gia = (data) => {
  this.id = data.id;
  this.user_id = data.user_id;
  this.khoa_hoc_id = data.khoa_hoc_id;
  this.diem_so = data.diem_so;
  this.binh_luan = data.binh_luan;
  this.created_at = data.created_at;
};

danh_gia.getById = (id, callback) => {
  const sqlString = "SELECT * FROM danh_gia WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

danh_gia.getAll = (callback) => {
  const sqlString = "SELECT * FROM danh_gia";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

danh_gia.insert = (data, callback) => {
  const sqlString = "INSERT INTO danh_gia SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

danh_gia.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE danh_gia SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

danh_gia.delete = (id, callback) => {
  db.query("DELETE FROM danh_gia WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = danh_gia;
