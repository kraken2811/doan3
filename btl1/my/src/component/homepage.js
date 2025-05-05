import React from "react";
import "./homepage.css"; 
import { Container, Row, Col, Badge } from "react-bootstrap";

const courses = [
  {
    title: "Ôn tập và Kiểm tra Vật lí 10",
    teacher: "Thầy Phạm Văn Tùng",
    lectures: 25,
    questions: 10000,
    image: "path_to_image_vatly10",
    isHot: false,
  },
  {
    title: "TopUni Tổng ôn PAT V-ACT",
    teacher: "Thầy HOCMAI",
    lectures: 202,
    questions: 5000,
    image: "path_to_image_patvact",
    isHot: false,
  },
  {
    title: "Ôn luyện Lịch sử 11",
    teacher: "Thầy HOCMAI",
    lectures: 0,
    questions: 477,
    image: "path_to_image_lichsu11",
    isHot: false,
  },
  {
    title: "Phòng luyện TN THPT - Môn Toán",
    teacher: "Thầy HOCMAI",
    lectures: 0,
    questions: 10000,
    image: "path_to_image_toan",
    isHot: true,
  },
  {
    title: "Nền tảng 12 - Môn Tiếng Anh",
    teacher: "Thầy Nguyễn Trung Nguyên",
    lectures: 50,
    questions: 1000,
    image: "path_to_image_tienganh",
    isHot: true,
  },
  {
    title: "TopUni Tổng ôn PAT-C HSA",
    teacher: "Thầy HOCMAI",
    lectures: 192,
    questions: 5000,
    image: "path_to_image_hsa",
    isHot: true,
  },
  {
    title: "Phòng luyện V-ACT",
    teacher: "Thầy HOCMAI",
    lectures: 0,
    questions: 12000,
    image: "path_to_image_vact",
    isHot: true,
  },
];

const CourseCard = ({ title, teacher, lectures, questions, image, isHot }) => {
  return (
    <div className="course-card">
      {isHot && <Badge bg="danger" className="hot-badge">HOT</Badge>}
      <img src={image} alt={title} className="course-image" />
      <div className="course-content">
        <h6 className="course-title">{title}</h6>
        <p className="course-teacher">Giáo viên: {teacher}</p>
        <div className="course-info">
          <span>{lectures} Bài giảng</span> | <span>{questions} Câu hỏi</span>
        </div>
      </div>
    </div>
  );
};

const HomePage1 = () => {
  return (
    <Container className="homepage-container">
      {/* Banner */}
      <div className="banner">
        <img src="path_to_banner" alt="Banner" className="banner-image" />
      </div>

      {/* Course List */}
      <Row className="g-4 mt-3">
        {courses.map((course, index) => (
          <Col key={index} xs={12} md={6} lg={4}>
            <CourseCard {...course} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage1;
