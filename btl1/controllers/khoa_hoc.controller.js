const Khoa_hoc = require("../models/khoa_hoc.model");

module.exports = {
   getAll: (req, res) => {
      Khoa_hoc.getAll((err, result) => {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          res.json(result);
        }
      });
    },
  
  getById: (req, res) => {
    const id = req.params.id;
    Khoa_hoc.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!result) return res.status(404).json({ message: "Course not found" });
      res.json(result);
    });
  },

 // Insert khóa học mới
insert: (req, res) => {
  const data = req.body; // Lấy dữ liệu từ body của request

  // Kiểm tra dữ liệu yêu cầu
  if (!data.ten_khoa_hoc || !data.gia || !data.trang_thai) {
    return res.status(400).json({
      error: "Thiếu thông tin bắt buộc: Tên khóa học, giá và trạng thái."
    });
  }

  // Thêm khóa học vào cơ sở dữ liệu
  Khoa_hoc.insert(data, (err, result) => {
    if (err) {
      console.error("Lỗi khi thêm khóa học:", err); // Ghi log lỗi chi tiết
      return res.status(500).json({ error: err.message }); // Trả về thông báo lỗi nếu có
    }

    // Trả về thông báo thành công khi thêm khóa học
    res.status(201).json({
      message: "Course added successfully",
      data: result
    });
  });
},


  update: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Khoa_hoc.update(data, id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Course updated successfully", data: result });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Khoa_hoc.delete(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Course deleted successfully" });
    });
  },
};
