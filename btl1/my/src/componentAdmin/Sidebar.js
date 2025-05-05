import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-dark text-white p-3" style={{ width: '250px', height: '100vh' }}>
      <h4>Trang Quản Trị</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/tongquat">Bảng Điều Khiển</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/qluser">Quản Lý Người Dùng</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/qlkhoahoc">Quản Lý Khóa Học</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/settings">Cài Đặt</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
