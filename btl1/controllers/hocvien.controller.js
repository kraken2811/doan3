const hoc_vien = require("../models/hocvien.model");

module.exports = {
  // getAll: (req, res) => {
  //   hoc_vien.getAll((result) => {
  //     res.send(result);
  //   });
  // },

  getAll: (req, res) => {
    hoc_vien.getAll((err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json(result);
      }
    });
  },

  getById: (req, res) => {
    const id = req.params.id;

    console.log("📌 ID nhận được:", id); // Kiểm tra ID đầu vào

    hoc_vien.getById(id, (err, result) => {
        if (err) {
            console.error("Lỗi trong controller:", err);
            return res.status(500).json({ message: "Lỗi server" });
        }

        if (!result) {
            return res.status(404).json({ message: "Không tìm thấy học viên" });
        }

        res.json(result);
    });
},


  insert: (req, res) => {
    const hocvien = req.body;
    hoc_vien.insert(hocvien, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const hocvien = req.body;
    const id = req.params.id;
    hoc_vien.update(hocvien,id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    hoc_vien.delete(id, (result) => {
      res.send(result);
    });
  },
};


