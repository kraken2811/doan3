import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const KhoaHoc = () => {
  const [khoaHoc, setKhoaHoc] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/khoahocs") // API backend
      .then((res) => {
        console.log(res.data);
        setKhoaHoc(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API:", err);
        setError("Không thể tải dữ liệu khóa học.");
      });
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary fw-bold">🌟 Danh Sách Khóa Học 🌟</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      {khoaHoc.length === 0 && !error && <p className="text-center">Đang tải dữ liệu...</p>}
      <div className="row">
        {khoaHoc.map((khoa) => (
          <div key={khoa.id} className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="card-body text-center">
                <h5 className="card-title fw-bold text-dark">{khoa.ten_khoa_hoc}</h5>
                <p className="card-text text-muted">{khoa.mo_ta}</p>
                <p className="card-text text-danger fw-bold fs-5">
                  {khoa.gia.toLocaleString()} VNĐ
                </p>
                {/* Thêm NavLink và truyền courseId vào URL */}
                <NavLink to={`/baihoc/${khoa.id}`} className="btn btn-primary btn-lg rounded-pill shadow-sm">
                  Đăng Ký Ngay
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p className="mb-0">&copy; 2025 Trung Tâm Anh Ngữ. All Rights Reserved.</p>
        <p className="mb-0">Liên hệ: contact@anhngu.com | SĐT: 0123 456 789</p>
      </footer>
    </div>
  );
};

export default KhoaHoc;
