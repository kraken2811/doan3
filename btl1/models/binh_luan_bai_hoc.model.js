const db = require("../common/db");

const binh_luan_bai_hoc = (data) => {
  this.id = data.id;
  this.user_id = data.user_id;
  this.bai_hoc_id = data.bai_hoc_id;
  this.noi_dung = data.noi_dung;
  this.created_at = data.created_at;
};

binh_luan_bai_hoc.getById = (id, callback) => {
  const sqlString = "SELECT * FROM binh_luan_bai_hoc WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

binh_luan_bai_hoc.getAll = (callback) => {
  const sqlString = "SELECT * FROM binh_luan_bai_hoc";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

binh_luan_bai_hoc.insert = (data, callback) => {
  const sqlString = "INSERT INTO binh_luan_bai_hoc SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

binh_luan_bai_hoc.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE binh_luan_bai_hoc SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

binh_luan_bai_hoc.delete = (id, callback) => {
  db.query("DELETE FROM binh_luan_bai_hoc WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = binh_luan_bai_hoc;
