const db = require("../common/db");

const hoc_vien = (hoc_vien) => {
  this.id = hoc_vien.id;
  this.user_id = hoc_vien.user_id;
  this.ngay_sinh = hoc_vien.ngay_sinh;
  this.gioi_tinh = hoc_vien.gioi_tinh;
  this.dia_chi = hoc_vien.dia_chi;
  this.ngay_dang_ky = hoc_vien.ngay_dang_ky;
  this.created_at = hoc_vien.created_at;
  this.updated_at = hoc_vien.updated_at;
};

hoc_vien.getById = (id, callback) => {
  const sqlString = "SELECT * FROM hoc_vien WHERE id = ?";

  db.query(sqlString, [id], (err, result) => {
    if (err) {
      console.error("Lỗi truy vấn MySQL:", err);
      return callback(err, null);
    }

    if (result.length === 0) {
      console.log("Không tìm thấy học viên với ID:", id);
      return callback(null, null);
    }

    console.log("Dữ liệu học viên tìm thấy:", result[0]);
    callback(null, result[0]); // Chỉ trả về một đối tượng, không phải mảng
  });
};


hoc_vien.getAll = (callback) => {
  const sqlString = "SELECT * FROM hoc_vien";
 
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });

};

hoc_vien.insert = (hoc_vien, callback) => {
  const sqlString = "INSERT INTO hoc_vien SET ?";
  db.query(sqlString, hoc_vien, (err, res) => { callback(err, res); });
};

hoc_vien.update = (hoc_vien, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE hoc_vien SET ? WHERE id = ?";
  db.query(sqlString, [hoc_vien, id], (err, res) => { callback(err, res); });
};

hoc_vien.delete = (id, callback) => {
  db.query("DELETE FROM hoc_vien WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = hoc_vien;
