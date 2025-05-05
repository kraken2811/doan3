import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const { id } = useParams();  // Lấy ID khóa học từ URL
  const [course, setCourse] = useState(null);
  const [baihocs, setBaihocs] = useState([]); // Lưu trữ dữ liệu bài học
  const [tenBaiHoc, setTenBaiHoc] = useState("");
  const [noiDung, setNoiDung] = useState("");
  const [thuTu, setThuTu] = useState("");
  const [urlVideo, setUrlVideo] = useState("");
  const [giaovien, setGiaovien] = useState("");
  const [muctieuKhoahoc, setMuctieuKhoahoc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Lấy thông tin chi tiết khóa học và bài học của khóa học
  useEffect(() => {
    // Lấy thông tin khóa học
    axios
      .get(`http://localhost:3000/khoahocs/${id}`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu khóa học:", error);
      });

    // Lấy danh sách bài học cho khóa học này
    axios
      .get(`http://localhost:3000/baihocs/${id}`)
      .then((response) => {
        setBaihocs(response.data); // Đảm bảo bạn sử dụng setBaihocs
      })
      .catch((error) => {
        console.error("Lỗi khi lấy bài học:", error);
      });
  }, [id]);

  const handleSubmit = () => {
    // Kiểm tra dữ liệu nhập vào
    if (!tenBaiHoc || !noiDung || !urlVideo || !thuTu || !giaovien || !muctieuKhoahoc) {
      setErrorMessage("Vui lòng điền đầy đủ tất cả các trường!");
      return;
    }

    const data = {
      ten_bai_hoc: tenBaiHoc,
      noi_dung: noiDung,
      khoa_hoc_id: id,  // Sử dụng id lấy từ URL
      thu_tu: thuTu,
      url_video: urlVideo,
      giaovien: giaovien,
      muctieu_khoahoc: muctieuKhoahoc
    };

    // Gửi yêu cầu thêm bài học mới
    axios
      .post("http://localhost:3000/add-lesson", data)
      .then((response) => {
        setSuccessMessage("Bài học đã được thêm thành công!");
        setErrorMessage(""); // Reset thông báo lỗi
        // Cập nhật lại danh sách bài học
        setBaihocs([...baihocs, response.data]); // Cập nhật danh sách bài học
      })
      .catch((error) => {
        setErrorMessage("Lỗi khi thêm bài học");
        setSuccessMessage(""); // Reset thông báo thành công
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Thêm Bài Học</h2>

      {/* Hiển thị thông báo lỗi nếu có */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* Hiển thị thông báo thành công nếu có */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <input
        type="text"
        placeholder="Tên bài học"
        value={tenBaiHoc}
        onChange={(e) => setTenBaiHoc(e.target.value)}
        className="form-control mb-3"
      />
      <textarea
        placeholder="Nội dung"
        value={noiDung}
        onChange={(e) => setNoiDung(e.target.value)}
        className="form-control mb-3"
      />
      <input
        type="text"
        placeholder="Thứ tự"
        value={thuTu}
        onChange={(e) => setThuTu(e.target.value)}
        className="form-control mb-3"
      />
      <input
        type="text"
        placeholder="URL Video"
        value={urlVideo}
        onChange={(e) => setUrlVideo(e.target.value)}
        className="form-control mb-3"
      />
      <input
        type="text"
        placeholder="Giáo viên"
        value={giaovien}
        onChange={(e) => setGiaovien(e.target.value)}
        className="form-control mb-3"
      />
      <textarea
        placeholder="Mục tiêu khóa học"
        value={muctieuKhoahoc}
        onChange={(e) => setMuctieuKhoahoc(e.target.value)}
        className="form-control mb-3"
      />
      <button onClick={handleSubmit} className="btn btn-primary">
        Thêm Bài Học
      </button>

      <div className="container mt-4">
        {course ? (
          <div>
            <h2>Chi Tiết Khóa Học: {course.ten_khoa_hoc}</h2>
            <p>{course.mo_ta}</p>

            <h4>Danh Sách Bài Học:</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Tên Bài Học</th>
                  <th>Nội Dung</th>
                  <th>URL Video</th>
                  <th>Giáo Viên</th>
                </tr>
              </thead>
              <tbody>
                {baihocs.map((baihoc) => (
                  <tr key={baihoc.id}>
                    <td>{baihoc.ten_bai_hoc}</td>
                    <td>{baihoc.noi_dung}</td>
                    <td>
                      <a href={baihoc.url_video} target="_blank" rel="noopener noreferrer">
                        Xem Video
                      </a>
                    </td>
                    <td>{baihoc.giaovien}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Đang tải dữ liệu khóa học...</p>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
