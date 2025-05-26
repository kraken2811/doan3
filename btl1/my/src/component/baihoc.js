import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Card, Spinner, Alert, ListGroup } from "react-bootstrap";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPriceHeader, setShowPriceHeader] = useState(false);

  // Hàm chuyển đổi URL YouTube sang embed
  const convertToEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("embed")) return url;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!courseId) {
          throw new Error("Không tìm thấy ID khóa học");
        }

        const [courseResponse, lessonsResponse] = await Promise.all([
          axios.get(`http://localhost:3000/khoahocs/${courseId}`),
          axios.get(`http://localhost:3000/baihocs?khoa_hoc_id=${courseId}`)
        ]);

        if (!courseResponse.data || courseResponse.data.length === 0) {
          throw new Error("Không tìm thấy thông tin khóa học");
        }

        setCourse(courseResponse.data[0]);
        setLessons(lessonsResponse.data || []);
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi khi tải dữ liệu");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      // Hiển thị header giá khi scroll qua phần giá (khoảng 300px)
      setShowPriceHeader(currentPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRegister = () => {
    if (!course) return;
    navigate("/payment", { state: { course } });
  };

  const handleLessonClick = (lessonId) => {
    navigate(`/learn/${courseId}/lesson/${lessonId}`);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">Không tìm thấy thông tin khóa học</Alert>
        <Button variant="primary" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </Container>
    );
  }

  const courseGoals = [
    course.goal1 || "Mục tiêu 1",
    course.goal2 || "Mục tiêu 2",
    course.goal3 || "Mục tiêu 3"
  ].filter(Boolean);

  return (
    <div className="course-detail-container">
      {showPriceHeader && (
        <div className="fixed-top bg-primary text-white p-1 shadow-sm" style={{ zIndex: 1030 }}>
          <Container>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{course.ten_khoa_hoc}</h5>
              <div className="d-flex align-items-center">
                <span className="fs-4 fw-bold me-3">{course.gia || "Liên hệ"}</span>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={handleRegister}
                  style={{ height: 'fit-content' }} // Đảm bảo chiều cao phù hợp
                >
                  Đăng ký ngay
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}

      <Container className="mt-4 pt-3">
        <Row>
          <Col lg={8}>
            <h1 className="mb-4">{course.ten_khoa_hoc || "Tên khóa học"}</h1>
            <p className="lead">{course.mo_ta || "Mô tả khóa học"}</p>

            {/* Video Preview */}
            <div className="mb-5">
              <h4>Xem trước khóa học</h4>
              {lessons[0]?.url_video ? (
                <div className="ratio ratio-16x9">
                  <iframe
                    src={convertToEmbedUrl(lessons[0].url_video)}
                    title="Giới thiệu khóa học"
                    allowFullScreen
                    className="rounded"
                  />
                </div>
              ) : (
                <Alert variant="info">Không có video giới thiệu</Alert>
              )}
            </div>

            {/* Course Goals */}
            <Card className="mb-4">
              <Card.Body>
                <Card.Title as="h4">Mục tiêu khóa học</Card.Title>
                <ul className="list-unstyled">
                  {courseGoals.map((goal, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      {goal}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>

            {/* Lessons List */}
            <Card className="mb-4">
              <Card.Body>
                <Card.Title as="h5">Danh sách bài học</Card.Title>
                {lessons.length > 0 ? (
                  <ListGroup variant="flush">
                    {lessons.map((lesson) => (
                      <ListGroup.Item
                        key={lesson.id}
                        action
                        onClick={() => handleLessonClick(lesson.id)}
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">
                            {lesson.ten_bai_hoc || "Bài học không có tiêu đề"}
                          </div>
                          {lesson.content || "Không có mô tả"}
                        </div>
                        <span className="badge bg-primary rounded-pill">Xem</span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <Alert variant="info">Không có bài học nào</Alert>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card style={{ top: "155px" }}>
              <Card.Body>
                <Card.Title className="text-center mb-4">
                  <h4>Học trọn gói với chỉ</h4>
                  <h2 className="text-primary">
                    <strong>{course.gia || "Liên hệ"}</strong>
                  </h2>
                </Card.Title>

                <Button
                  variant="primary"
                  className="w-100 mb-3 py-2 fw-bold"
                  onClick={handleRegister}
                >
                  ĐĂNG KÝ NGAY
                </Button>

                <Button
                  variant="outline-primary"
                  className="w-100 mb-3"
                  onClick={() => lessons[0] && handleLessonClick(lessons[0].id)}
                  disabled={lessons.length === 0}
                >
                  HỌC THỬ MIỄN PHÍ
                </Button>

                <div className="border-top pt-3">
                  <h5>Bạn sẽ nhận được:</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="bi bi-check-circle text-success me-2"></i>
                      Toàn bộ {lessons.length} bài học
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle text-success me-2"></i>
                      Hỗ trợ 24/7
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle text-success me-2"></i>
                      Chứng chỉ hoàn thành
                    </li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CourseDetails;