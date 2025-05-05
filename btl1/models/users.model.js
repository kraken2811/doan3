const db = require("../common/db");

const users = (users) => {
  this.id = users.id;
  this.ho_ten = users.ho_ten;
  this.email = users.email;
  this.password = users.password;
  this.sdt = users.sdt;
  this.vai_tro = users.vai_tro;
  this.trang_thai = users.trang_thai;
  this.created_at = users.created_at;
  this.updated_at = users.updated_at;
};

users.getById = (id, callback) => {
  const sqlString = "SELECT * FROM users WHERE id = ?";
  db.query(sqlString, [id], (err, result) => { callback(err, result); });
};

users.getAll = (callback) => {
  const sqlString = "SELECT * FROM users";
  console.log(" Đang chạy truy vấn:", sqlString);

  db.query(sqlString, (err, result) => { 
    if (err) {
      console.error(" LỖI SQL:", err); // In lỗi chi tiết
      return callback(err, null);
    }

    console.log("Dữ liệu từ MySQL:", result); // In dữ liệu lấy từ MySQL
    callback(null, result);
  });
};


users.insert = (users, callback) => {
  const sqlString = "INSERT INTO users SET ?";
  db.query(sqlString, users, (err, res) => { callback(err, res); });
};

users.update = (users, id, callback) => {
  if (!id) return callback('Thiếu ID');
  const sqlString = "UPDATE users SET ? WHERE id = ?";
  db.query(sqlString, [users, id], (err, res) => { callback(err, res); });
};

users.delete = (id, callback) => {
  db.query("DELETE FROM users WHERE id = ?", [id], (err, res) => { callback(err, res); });
};

module.exports = users;
