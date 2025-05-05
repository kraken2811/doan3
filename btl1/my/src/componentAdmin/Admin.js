import React from "react";
import Sidebar from "./Sidebar.js"; // Import Sidebar đúng cách

const Admin = () => {
  return (
    <div className="d-flex">
      {/* Sidebar luôn hiển thị */}
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="container-fluid p-4">
        {/* Các component khác sẽ hiển thị bên cạnh Sidebar */}
        <h1>Admin Panel</h1>
        {/* Bạn có thể thêm các route con ở đây nếu cần */}
      </div>
    </div>
  );
};

export default Admin;
