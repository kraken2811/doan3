const users = require("../models/users.model");

module.exports = {
  getById: (req, res) => {
    const id = req.params.id;
    users.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: "Lỗi truy vấn CSDL" });
      if (!result) return res.status(404).json({ message: "Không tìm thấy user" });
      res.json(result);
    });
  },
  
  getAll: (req, res) => {
    users.getAll((err, result) => {
      if (err) return res.status(500).json({ error: "Lỗi truy vấn CSDL" });
      res.json(result);
    });
  },
  

  insert: (req, res) => {
    console.log("Dữ liệu nhận từ client:", req.body); 
    const data = req.body;
    users.insert(data, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi chèn dữ liệu", details: err });
      }
      res.status(201).json({
        message: "Thêm user thành công",
        insertedId: result.insertId
      });
    });
  },
  
  

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    users.update(data, id, (result) => { res.send(result); });
  },

  delete: (req, res) => {
    const id = req.params.id;
    users.delete(id, (result) => { res.send(result); });
  },

};
