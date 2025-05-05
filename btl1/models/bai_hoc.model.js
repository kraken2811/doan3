const db = require("../common/db");

const bai_hoc = (data) => {
  this.id = data.id;
  this.ten_bai_hoc = data.ten_bai_hoc;
  this.noi_dung = data.noi_dung;
  this.khoa_hoc_id = data.khoa_hoc_id;
  this.thu_tu = data.thu_tu;
  this.created_at = data.created_at;
  this.url_video = data.url_video;  // Thêm trường url_video
  this.giaovien = data.giaovien;    // Thêm trường giaovien
  this.muctieu_khoahoc = data.muctieu_khoahoc;  // Thêm trường muctieu_khoahoc
};

bai_hoc.getById = (id, callback) => {
  const sqlString = "SELECT * FROM bai_hoc WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

bai_hoc.getByCourseId = (courseId, callback) => {
  const sqlString = "SELECT * FROM bai_hoc WHERE khoa_hoc_id = ?";
  db.query(sqlString, [courseId], (err, result) => {
    if (err) {
      console.error("Error retrieving lessons:", err);
      return callback([]); // Trả về mảng rỗng nếu có lỗi
    }
    callback(null, result);  // Trả kết quả bài học
  });
};

bai_hoc.getAll = (callback) => {
  const sqlString = "SELECT * FROM bai_hoc";
  db.query(sqlString, (err, result) => { callback(err, result); });
};

bai_hoc.insert = (data, callback) => {
  const sqlString = "INSERT INTO bai_hoc SET ?";
  db.query(sqlString, data, (err, res) => { callback(err, res); });
};

bai_hoc.update = (data, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE bai_hoc SET ? WHERE id = ?";
  db.query(sqlString, [data, id], (err, res) => { callback(err, res); });
};

bai_hoc.delete = (id, callback) => {
  db.query("DELETE FROM bai_hoc WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = bai_hoc;
