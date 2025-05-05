import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import logo from "../logo.svg";
import { NavLink } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await axios.post("http://localhost:3000/storeprocedure/login", { email, password });
    
            console.log("🔥 API Response:", response.data); // Debug API response
    
            if (response.data?.message === "Login successful") {
                alert("Đăng nhập thành công!");
    
                // Lưu token vào localStorage
                const token = response.data.token;
                if (token) {
                    localStorage.setItem("token", token);
                    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                } else {
                    console.error("❌ Không tìm thấy token trong response!");
                }
    
                // 🔥 Lưu thông tin user vào localStorage
                if (response.data.user) {
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    // Lấy role từ response
                    const userRole = response.data.user.role;

                    // Điều hướng theo vai trò
                    if (userRole === "admin") {
                        navigate("/admin");  // Điều hướng tới trang admin
                    } else if (userRole === "teacher") {
                        navigate("/teacher");  // Điều hướng tới trang giáo viên
                    } else {
                        navigate("/home");  // Điều hướng tới trang học viên (mặc định)
                    }
                } else {
                    console.error("❌ Không tìm thấy thông tin user trong response!");
                }
    
            } else {
                alert("Sai email hoặc mật khẩu!");
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Đăng nhập thất bại!");
        } finally {
            setLoading(false);
        }
    };
    
    
    return (
        <>
            <div className="Login-container">
                <h2>Đăng nhập</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <button className="btn1" type="submit" disabled={loading}>
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                    <p>Quên mật khẩu?</p>
                    <hr width="100%" color="#808080" />
                    <NavLink to="/slide">
                        <button className="btn" type="button">Đăng ký</button>
                    </NavLink>
                </form>
            </div>
            <div className="img">
                <img src={logo} alt="logo" />
                <h4>Master English – Unlock Your Future!</h4>
            </div>
        </>
    );
}

export default Login;
