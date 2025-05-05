const Bai_hoc = require("../models/bai_hoc.model");

module.exports = {
  // Lấy tất cả bài học hoặc bài học theo khóa học
  getAll: (req, res) => {
    const khoaHocId = req.query.khoa_hoc_id;  // Lấy tham số khoa_hoc_id từ query
    if (khoaHocId) {
      // Nếu có khoa_hoc_id, lấy bài học theo khoa_hoc_id
      Bai_hoc.getByCourseId(khoaHocId, (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Lỗi khi lấy bài học" });
        }
        res.json(result);  // Trả kết quả cho client
      });
    } else {
      // Nếu không có khoa_hoc_id, trả về tất cả bài học
      Bai_hoc.getAll((err, result) => {
        if (err) {
          return res.status(500).json({ error: "Lỗi khi lấy tất cả bài học" });
        }
        res.json(result);  // Trả tất cả bài học
      });
    }
  },

  getByCourseId: (req, res) => {
    const courseId = req.params.id;  // Lấy khóa học ID từ URL params

    if (!courseId) {
      return res.status(400).json({ error: "Thiếu khóa học id" });  // Kiểm tra nếu không có khóa học ID
    }

    // Gọi phương thức trong model để lấy bài học theo khoa_hoc_id
    Bai_hoc.getByCourseId(courseId, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi khi lấy bài học" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "Không tìm thấy bài học cho khóa học này" });
      }
      res.json(result);  // Trả về bài học của khóa học có ID tương ứng
    });
  },

  // Lấy bài học theo ID
  getById: (req, res) => {
    const id = req.params.id;
    Bai_hoc.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi khi lấy bài học" });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({ error: "Bài học không tồn tại" });
      }
      res.json(result);  // Trả về bài học
    });
  },

  // Thêm bài học
  insert: (req, res) => {
    const { ten_bai_hoc, noi_dung, khoa_hoc_id, thu_tu, url_video, giaovien, muctieu_khoahoc } = req.body;
    
    if (!ten_bai_hoc || !noi_dung || !khoa_hoc_id || !thu_tu || !url_video || !giaovien || !muctieu_khoahoc) {
      return res.status(400).json({ error: "Thiếu thông tin cần thiết" });
    }

    const data = {
      ten_bai_hoc,
      noi_dung,
      khoa_hoc_id,
      thu_tu,
      url_video,
      giaovien,
      muctieu_khoahoc,
      created_at: new Date()
    };

    Bai_hoc.insert(data, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi khi thêm bài học" });
      }
      res.status(201).json(result);  // Trả về bài học đã thêm
    });
  },

  // Cập nhật bài học
  update: (req, res) => {
    const { ten_bai_hoc, noi_dung, khoa_hoc_id, thu_tu, url_video, giaovien, muctieu_khoahoc } = req.body;
    const id = req.params.id;
    
    if (!id) return res.status(400).json({ error: "Thiếu ID bài học" });

    const data = {
      ten_bai_hoc,
      noi_dung,
      khoa_hoc_id,
      thu_tu,
      url_video,
      giaovien,
      muctieu_khoahoc
    };

    Bai_hoc.update(data, id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi khi cập nhật bài học" });
      }
      res.json(result);  // Trả về bài học đã cập nhật
    });
  },

  // Xóa bài học
  delete: (req, res) => {
    const id = req.params.id;
    Bai_hoc.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi khi xóa bài học" });
      }
      res.json(result);  // Trả về kết quả xóa
    });
  },
};
