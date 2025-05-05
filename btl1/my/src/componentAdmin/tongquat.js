import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  // Khởi tạo state để lưu thông tin tổng số người dùng, khóa học, doanh thu, và học viên
  const [data, setData] = useState({
    totalUsers: 0,
    totalCourses: 0,
    revenue: 0,
    totalStudents: 0,  // Tổng số học viên
  });

  const [users, setUsers] = useState([]); // State để lưu danh sách người dùng
  const [courses, setCourses] = useState([]); // State để lưu danh sách khóa học

  useEffect(() => {
    // Gửi yêu cầu đến API để lấy dữ liệu người dùng
    const fetchData = async () => {
      try {
        // Gửi yêu cầu GET tới API của bạn để lấy danh sách người dùng
        const response = await axios.get('http://localhost:3000/users'); // Thay đổi URL API cho đúng
        setUsers(response.data); // Cập nhật state users với dữ liệu từ API
        const totalCourses = await axios.get('http://localhost:3000/khoahocs'); // Thay đổi URL API cho đúng
        setCourses(totalCourses.data);
        // Tính tổng số học viên
        const totalStudents = response.data.filter(user => user.vai_tro === 'hoc_vien').length;

        // Cập nhật state data với các thông tin cần thiết
        setData({
          totalUsers: response.data.length,  // Tổng số người dùng
          totalCourses: totalCourses.data.length,  // Tổng số khóa học
          revenue: 5000,  // Giả sử doanh thu là 5000 VND
          totalStudents: totalStudents,  // Tổng số học viên
        });
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    };

    fetchData(); // Gọi hàm fetchData khi component mount
  }, []); // Chạy khi component mount (với [] làm dependencies để chỉ chạy một lần)

  return (
    <div className="container mt-4">
      <h2>Bảng Điều Khiển</h2>
      <div className="row">
        <div className="col-12 col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Tổng Số Người Dùng</div>
            <div className="card-body">
              <h5 className="card-title">{data.totalUsers}</h5>
              <p className="card-text">Số lượng người dùng hiện tại trong hệ thống.</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Khóa Học</div>
            <div className="card-body">
              <h5 className="card-title">{data.totalCourses}</h5>
              <p className="card-text">Số lượng khóa học đang có trong hệ thống.</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">Doanh Thu</div>
            <div className="card-body">
              <h5 className="card-title">{data.revenue} VND</h5>
              <p className="card-text">Doanh thu từ các khóa học đã bán.</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card text-white bg-info mb-3">
            <div className="card-header">Tổng Số Học Viên</div>
            <div className="card-body">
              <h5 className="card-title">{data.totalStudents}</h5>
              <p className="card-text">Số lượng học viên trong hệ thống.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
