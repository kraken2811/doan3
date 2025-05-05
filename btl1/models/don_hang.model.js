const db = require("../common/db");

const don_hang = (data) => {
  this.id = data.id;
  this.user_id = data.user_id;
  this.tong_tien = data.tong_tien;
  this.trang_thai = data.trang_thai;
  this.created_at = data.created_at;
  this.updated_at = data.updated_at;
};

don_hang.getById = (id, callback) => {
  const sqlString = "SELECT * FROM don_hang WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

don_hang.getAll = (callback) => {
  const sqlString = "SELECT * FROM don_hang";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

don_hang.insert = (data, callback) => {
  const sqlString = "INSERT INTO don_hang SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

don_hang.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE don_hang SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

don_hang.delete = (id, callback) => {
  db.query("DELETE FROM don_hang WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = don_hang;
