const db = require("../common/db");

const giao_vien = (data) => {
  this.id = data.id;
  this.user_id = data.user_id;
  this.chuyen_mon = data.chuyen_mon;
  this.kinh_nghiem = data.kinh_nghiem;
  this.hoc_vi = data.hoc_vi;
  this.mo_ta_ngan = data.mo_ta_ngan;
  this.trang_thai = data.trang_thai;
  this.ngay_tham_gia = data.ngay_tham_gia;
  this.created_at = data.created_at;
  this.updated_at = data.updated_at;
};

giao_vien.getById = (id, callback) => {
  const sqlString = "SELECT * FROM giao_vien WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

giao_vien.getAll = (callback) => {
  const sqlString = "SELECT * FROM giao_vien";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

giao_vien.insert = (data, callback) => {
  const sqlString = "INSERT INTO giao_vien SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

giao_vien.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE giao_vien SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

giao_vien.delete = (id, callback) => {
  db.query("DELETE FROM giao_vien WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = giao_vien;