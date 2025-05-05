import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa";

const Support = () => {
  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <div className="bg-primary text-center py-4">
        <h2 className="fw-bold text-uppercase" style={{ color: "#72d0f4" }}>
          CHÚNG TÔI CÓ THỂ GIÚP GÌ CHO BẠN?
        </h2>
        <div className="mt-3 d-flex justify-content-center">
          <div className="input-group w-50">
            <input
              type="text"
              className="form-control rounded"
              placeholder="Mô tả sự cố của bạn..."
            />
            <span className="input-group-text bg-white">
              <FaSearch />
            </span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mt-4">
        <div className="row">
          {/* Left Sidebar */}
          <div className="col-md-3">
            <h5 className="fw-bold">📌 Nội dung cần hỗ trợ</h5>
            <ul className="list-unstyled">
              {["Quy định và chính sách", "Hướng dẫn đăng ký học", "Hướng dẫn học tại trung tâm", "Hướng dẫn xử lý sự cố", "Các kênh hỗ trợ"].map((item, index) => (
                <li key={index} className="py-2 px-3 rounded hover-bg">{item}</li>
              ))}
              <li className="mt-3 text-primary fw-bold">✍️ Tạo yêu cầu hỗ trợ</li>
            </ul>
          </div>
          
          {/* Right Content */}
          <div className="col-md-9">
            <h5 className="fw-bold">❓ Những câu hỏi thường gặp</h5>
            <div className="row g-3">
              {["Hướng dẫn xử lý lỗi xem bài giảng", "Hướng dẫn kết nối tài khoản Zalo CSKH", "Hướng dẫn làm, in, tải bài tập tự luyện online", "Quy định chung về chuyển đổi, hoàn trả khóa học", "Hoặc tạo yêu cầu hỗ trợ"].map((item, index) => (
                <div key={index} className="col-md-4">
                  <div className="border p-3 text-center rounded shadow-sm bg-light hover-card">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Styles */}
      <style>
        {`
          .hover-bg:hover { background-color: #f8f9fa; cursor: pointer; }
          .hover-card:hover { transform: scale(1.05); transition: 0.3s; }
        `}
      </style>
    </div>
  );
};

export default Support;