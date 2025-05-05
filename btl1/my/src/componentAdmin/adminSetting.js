// src/components/AdminSettings.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Thay useHistory bằng useNavigate
import axios from "axios";

const AdminSettings = () => {
  const navigate = useNavigate();  // Thay useHistory bằng useNavigate
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Lấy thông tin admin từ localStorage khi component được mount
  useEffect(() => {
    const storedAdminInfo = localStorage.getItem("adminInfo");
    if (storedAdminInfo) {
      setAdminInfo(JSON.parse(storedAdminInfo)); // Lấy và lưu thông tin admin từ localStorage
      setNewName(JSON.parse(storedAdminInfo).name);
      setNewEmail(JSON.parse(storedAdminInfo).email);
    } else {
      // Nếu không có thông tin admin trong localStorage, chuyển hướng về trang đăng nhập
      navigate("/login");
    }
  }, [navigate]);  // Thêm `navigate` vào mảng dependency

  // Hàm cập nhật thông tin admin
  const handleSubmit = () => {
    // Kiểm tra các trường nhập liệu
    if (!newName || !newEmail || !newPassword) {
      setErrorMessage("Vui lòng điền đầy đủ tất cả các trường!");
      return;
    }

    // Cập nhật thông tin admin vào localStorage
    const updatedAdminInfo = {
      name: newName,
      email: newEmail,
      role: adminInfo.role, // Vai trò admin không thay đổi
    };

    localStorage.setItem("adminInfo", JSON.stringify(updatedAdminInfo));

    setSuccessMessage("Cập nhật thông tin thành công!");
    setErrorMessage("");
  };

  const handleLogout = () => {
    // Xóa thông tin đăng nhập khỏi localStorage
    localStorage.removeItem("userToken");
    localStorage.removeItem("adminInfo");
    // Điều hướng về trang đăng nhập
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <h2>Cài Đặt Tài Khoản Admin</h2>

      {/* Hiển thị thông báo lỗi nếu có */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* Hiển thị thông báo thành công nếu có */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {/* Hiển thị thông tin tài khoản admin */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Thông Tin Tài Khoản</h5>
          <p><strong>Tên:</strong> {adminInfo.name}</p>
          <p><strong>Email:</strong> {adminInfo.email}</p>
          <p><strong>Vai trò:</strong> {adminInfo.role}</p>
        </div>
      </div>

      {/* Form cập nhật thông tin tài khoản admin */}
      <div className="form-group">
        <label>Tên</label>
        <input
          type="text"
          className="form-control"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Mật khẩu mới</label>
        <input
          type="password"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit} className="btn btn-primary mt-3">
        Cập Nhật Thông Tin
      </button>

      {/* Nút đăng xuất */}
      <button onClick={handleLogout} className="btn btn-danger mt-3 ml-2">
        Đăng Xuất
      </button>
    </div>
  );
};

export default AdminSettings;
