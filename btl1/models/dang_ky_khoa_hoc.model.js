const db = require("../common/db");

const dang_ky_khoa_hoc = (data) => {
  this.id = data.id;
  this.user_id = data.user_id;
  this.khoa_hoc_id = data.khoa_hoc_id;
  this.ngay_dang_ky = data.ngay_dang_ky;
  this.trang_thai = data.trang_thai;
  this.created_at = data.created_at;
  this.updated_at = data.updated_at;
};

dang_ky_khoa_hoc.getById = (id, callback) => {
  const sqlString = "SELECT * FROM dang_ky_khoa_hoc WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

dang_ky_khoa_hoc.getAll = (callback) => {
  const sqlString = "SELECT * FROM dang_ky_khoa_hoc";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

dang_ky_khoa_hoc.insert = (data, callback) => {
  const sqlString = "INSERT INTO dang_ky_khoa_hoc SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

dang_ky_khoa_hoc.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE dang_ky_khoa_hoc SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

dang_ky_khoa_hoc.delete = (id, callback) => {
  db.query("DELETE FROM dang_ky_khoa_hoc WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = dang_ky_khoa_hoc;
