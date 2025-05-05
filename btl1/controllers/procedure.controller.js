const jwt = require("jsonwebtoken");
const StoreProcedure = require("../models/procedure.model");
const dotenv = require("dotenv");

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Lấy khóa bí mật từ .env

module.exports = {
    login: (req, res) => {
        const email = req.body.email || req.query.email;
        const password = req.body.password || req.query.password;

        if (!email || !password) {
            return res.status(400).json({ error: "Missing email or password parameter" });
        }

        // Kiểm tra đăng nhập từ cơ sở dữ liệu
        StoreProcedure.checkLogin(email, password, (err, result) => {
            if (err) {
                console.error("Error during database query:", err); // Log lỗi khi truy vấn cơ sở dữ liệu
                return res.status(500).json({ error: err });
            }

            console.log("Database query result:", result); // Log kết quả truy vấn cơ sở dữ liệu

            if (result && result.length > 0) {
                const user = result[0]; // Lấy thông tin người dùng từ cơ sở dữ liệu

                // Kiểm tra xem vai trò người dùng có tồn tại không
                if (!user.vai_tro) {
                    console.error("User does not have a role defined!"); // Log khi không có vai trò
                    return res.status(500).json({ error: "User role not defined!" });
                }

                // Tạo token JWT
                const token = jwt.sign(
                    { id: user.id, email: user.email, role: user.vai_tro }, 
                    SECRET_KEY, 
                    { expiresIn: "2h" }
                );

                // 🔥 Trả về thông tin user đúng định dạng
                return res.json({
                    message: "Login successful",
                    token, 
                    user: {
                        id: user.id,
                        username: user.name,
                        email: user.email,
                        fullName: user.ho_ten,
                        phone: user.sdt,
                        role: user.vai_tro
                    }
                });
            } else {
                console.log("Invalid credentials - User not found"); // Log khi không tìm thấy người dùng
                return res.status(401).json({ message: "Invalid credentials" });
            }
        });
    }
};
