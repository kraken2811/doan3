const bcrypt = require("bcryptjs");
const User = require("../models/User");
const HocVien = require("../models/HocVien");

const AuthController = {
    register: async (req, res) => {
        try {
            const { name, email, password, phone, birthdate, address } = req.body;

            // Kiểm tra email đã tồn tại chưa
            User.findByEmail(email, async (err, result) => {
                if (err) return res.status(500).json({ success: false, message: "Lỗi kiểm tra email!" });
                if (result.length > 0) return res.status(400).json({ success: false, message: "Email đã tồn tại!" });

                // Mã hóa mật khẩu


                // Thêm vào bảng user
                User.createUser(name, email, password, phone, (err, userResult) => {
                    if (err) return res.status(500).json({ success: false, message: "Lỗi khi tạo tài khoản!" });

                    const userId = userResult.insertId;

                    // Thêm vào bảng hocvien
                    HocVien.createHocVien(userId, birthdate, address, (err, hocVienResult) => {
                        if (err) return res.status(500).json({ success: false, message: "Lỗi khi thêm học viên!" });

                        return res.status(201).json({ success: true, message: "Đăng ký thành công!" });
                    });
                });
            });

        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            res.status(500).json({ success: false, message: "Lỗi hệ thống!" });
        }
    }
};

module.exports = AuthController;
