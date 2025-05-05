import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const User = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      console.error("Không tìm thấy dữ liệu người dùng!");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  if (!user) return <p className="text-center">Bạn cần đăng nhập để xem thông tin.</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-primary">👤 Thông Tin Người Dùng</h2>
      <div className="card shadow p-4">
        <div className="row align-items-center text-dark">
          <div className="col-md-4">
            <h5 className="fw-bold mb-1">Họ Tên:</h5>
            <p className="mb-0">{user.fullName}</p>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold mb-1">Email:</h5>
            <p className="mb-0">{user.email}</p>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold mb-1">Số Điện Thoại:</h5>
            <p className="mb-0">{user.phone}</p>
          </div>
        </div>

        {/* Nút chỉnh sửa và đăng xuất */}
        <div className="d-flex justify-content-center gap-2 mt-3">
          <NavLink to="/edit-profile" className="btn btn-warning btn-sm px-3">
            ✏️ Chỉnh sửa
          </NavLink>
          <button onClick={handleLogout} className="btn btn-danger btn-sm px-3">
            🚪 Đăng xuất
          </button>
        </div>
      </div>

      <h3 className="text-center mt-5">📚 Khóa Học Đã Đăng Ký</h3>
      <div className="row">
        {user.courses && user.courses.length > 0 ? (
          user.courses.map((course) => (
            <div key={course.id} className="col-md-4 mb-4">
              <div className="card p-3 text-center">
                <h5 className="fw-bold text-dark">{course.name}</h5>
                <p className="text-muted">{course.description}</p>
                <p className="text-danger fw-bold">{course.price.toLocaleString()} VNĐ</p>
                <NavLink to={`/course/${course.id}`} className="btn btn-primary btn-sm">
                  Xem chi tiết
                </NavLink>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">Bạn chưa đăng ký khóa học nào.</p>
        )}
      </div>
    </div>
  );
};

export default User;
