import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import "./register.css";

function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        phone: "",
        name: "",
        birthdate: "",
        address: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3000/storeprocedure/register", formData)
            .then((response) => {
                if (response.data.success) {
                    alert("Đăng ký thành công!");
                    navigate("/login");
                } else {
                    alert("Đăng ký thất bại! " + response.data.message);
                }
            })
            .catch((error) => {
                console.error("Lỗi đăng ký:", error);
                alert("Đã xảy ra lỗi, vui lòng thử lại!");
            });
    };

    return (
        <div className="register-container">
            <h2>Đăng ký</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Họ và tên" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Mật khẩu" value={formData.password} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Số điện thoại" value={formData.phone} onChange={handleChange} required />
                <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Quê quán" value={formData.address} onChange={handleChange} required />
                <button className="btn1" type="submit">Đăng ký</button>
                <p>Đã có tài khoản? <NavLink to="/login" className="login-link">Đăng nhập</NavLink></p>
            </form>
        </div>
    );
}

export default Register;
