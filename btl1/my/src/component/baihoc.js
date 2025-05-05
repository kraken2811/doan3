import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';  // Đảm bảo import đúng
import { useNavigate } from "react-router-dom"; // Import useNavigate để điều hướng
import axios from "axios";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

// Hàm chuyển đổi URL YouTube sang embed
const convertToEmbedUrl = (url) => {
  if (!url) return "";

  // Kiểm tra nếu URL là dạng embed rồi thì trả lại luôn
  if (url.includes("embed")) {
    return url;
  }

  let videoId = "";
  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0]; // Lấy phần video ID
  }

  return `https://www.youtube.com/embed/${videoId}`;
};

const CourseDetails = () => {
  const { courseId } = useParams();  // Lấy courseId từ URL
  const [course, setCourse] = useState(null);  // Thông tin khóa học
  const [lessons, setLessons] = useState([]);  // Danh sách bài học
  const [errorMessage, setErrorMessage] = useState("");  // Thông báo lỗi nếu có
  const navigate = useNavigate(); // Dùng để chuyển hướng

  useEffect(() => {
    if (!courseId) {
      setErrorMessage("Không tìm thấy khóa học.");
      return;
    }

    // Lấy thông tin khóa học từ API
    axios
      .get(`http://localhost:3000/khoahocs/${courseId}`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        setErrorMessage("Không tìm thấy khóa học.");
        console.error("Lỗi khi lấy dữ liệu khóa học:", error);
      });

    // Lấy danh sách bài học cho khóa học từ API
    axios
      .get(`http://localhost:3000/baihocs?courseId=${courseId}`)
      .then((response) => {
        setLessons(response.data);  // Chỉ lưu bài học thuộc courseId
      })
      .catch((error) => {
        setErrorMessage("Không tìm thấy bài học.");
        console.error("Lỗi khi lấy bài học:", error);
      });
  }, [courseId]);  // Chạy lại useEffect khi `courseId` thay đổi

  const handleRegister = () => {
    // Chuyển hướng đến trang thanh toán
    navigate("/payment");
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {course ? (
            <>
              <h2>{course.ten_khoa_hoc}</h2>
              <p>{course.description}</p>

              {/* Hiển thị video bài giảng */}
              {lessons.length > 0 && lessons[0].url_video ? (
                <div className="video-container">
                  <iframe
                    width="100%"
                    height="400"
                    src={convertToEmbedUrl(lessons[0].url_video)}  // Sử dụng hàm convert để lấy URL nhúng
                    title="Giới thiệu khóa học"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <p>Không có video để hiển thị.</p>
              )}

              <Card className="p-3 mt-4">
                <h4>Mục tiêu khóa học</h4>
                <ul>
                  <li>{course.goal1}</li>
                  <li>{course.goal2}</li>
                  <li>{course.goal3}</li>
                </ul>
              </Card>

              <Card className="p-3 mt-4">
                <h5>Bài giảng miễn phí</h5>
                {lessons.length > 0 ? (
                  <ul>
                    {lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <h6>{lesson.ten_bai_hoc}</h6>
                        <p>{lesson.content}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Không có bài giảng miễn phí.</p>
                )}
              </Card>

              {/* Nút Đăng ký */}
              <Button variant="primary" onClick={handleRegister} className="w-100 mt-2">
                ĐĂNG KÝ NGAY
              </Button>
            </>
          ) : (
            <p>Đang tải thông tin khóa học...</p>
          )}
        </Col>

        <Col md={4}>
          <h4>Học trọn gói với chỉ:</h4>
          <h2>
            <strong>{course ? course.gia : "Đang tải giá..."}</strong>
          </h2>
          <Button variant="warning" className="w-100 mt-3">
            HỌC THỬ MIỄN PHÍ
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetails;
