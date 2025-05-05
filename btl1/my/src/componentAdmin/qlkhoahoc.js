import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    ten_khoa_hoc: "",
    mo_ta: "",
    gia: 0,
    trang_thai: "dang_mo",
  });

  const navigate = useNavigate();  // Khai báo useNavigate

  // Fetch danh sách khóa học từ API khi component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/khoahocs")
      .then((response) => {
        setCourses(response.data); // Lưu trữ dữ liệu khóa học vào state courses
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
      });
  }, []); // Chạy một lần khi component mount

  // Thêm khóa học mới
  const handleAddCourse = () => {
    axios
      .post("http://localhost:3000/khoahocs", newCourse)
      .then((response) => {
        setCourses((prevCourses) => [...prevCourses, response.data.data]);
        setNewCourse({
          ten_khoa_hoc: "",
          mo_ta: "",
          gia: 0,
          trang_thai: "dang_mo",
        });
        alert("Khóa học đã được thêm thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi thêm khóa học:", error);
      });
  };

  // Cập nhật thông tin khóa học
  const handleUpdateCourse = (id) => {
    axios
      .put(`http://localhost:3000/khoahocs/${id}`, newCourse)
      .then((response) => {
        const updatedCourses = courses.map((course) =>
          course.id === id ? { ...course, ...newCourse } : course
        );
        setCourses(updatedCourses); // Cập nhật lại danh sách khóa học
        alert("Khóa học đã được cập nhật thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật khóa học:", error);
      });
  };

  // Xóa khóa học
  const handleDeleteCourse = (id) => {
    axios
      .delete(`http://localhost:3000/khoahocs/${id}`)
      .then(() => {
        setCourses(courses.filter((course) => course.id !== id)); // Cập nhật lại danh sách khóa học
        alert("Khóa học đã được xóa thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi xóa khóa học:", error);
      });
  };

  // Xem chi tiết khóa học
  const handleViewDetails = (id) => {
    navigate(`/course/${id}`);  // Điều hướng đến trang chi tiết khóa học
  };

  return (
    <div className="container mt-4">
      <h2>Quản lý Khóa Học</h2>

      {/* Form thêm khóa học */}
      <div className="mb-3">
        <h4>Thêm Khóa Học</h4>
        <input
          type="text"
          placeholder="Tên khóa học"
          value={newCourse.ten_khoa_hoc}
          onChange={(e) =>
            setNewCourse({ ...newCourse, ten_khoa_hoc: e.target.value })
          }
          className="form-control mb-2"
        />
        <textarea
          placeholder="Mô tả"
          value={newCourse.mo_ta}
          onChange={(e) => setNewCourse({ ...newCourse, mo_ta: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="number"
          placeholder="Giá"
          value={newCourse.gia}
          onChange={(e) => setNewCourse({ ...newCourse, gia: e.target.value })}
          className="form-control mb-2"
        />
        <select
          value={newCourse.trang_thai}
          onChange={(e) => setNewCourse({ ...newCourse, trang_thai: e.target.value })}
          className="form-control mb-3"
        >
          <option value="dang_mo">Đang Mở</option>
          <option value="dong">Đóng</option>
        </select>
        <button onClick={handleAddCourse} className="btn btn-primary">
          Thêm Khóa Học
        </button>
      </div>

      {/* Bảng danh sách khóa học */}
      <h4>Danh Sách Khóa Học</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Tên Khóa Học</th>
            <th>Mô Tả</th>
            <th>Giá</th>
            <th>Trạng Thái</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.ten_khoa_hoc}</td>
              <td>{course.mo_ta}</td>
              <td>{course.gia}</td>
              <td>{course.trang_thai}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => handleViewDetails(course.id)}  // Gọi hàm điều hướng
                >
                  Xem Chi Tiết
                </button>
                <button
                  className="btn btn-warning ml-2"
                  onClick={() => handleUpdateCourse(course.id)}
                >
                  Cập Nhật
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseManagement;
