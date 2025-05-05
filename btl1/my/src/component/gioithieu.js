import React from 'react';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import { FaChalkboardTeacher, FaGraduationCap, FaHeadset } from 'react-icons/fa'; // Thêm các biểu tượng

const HomePage = () => {
  return (
    <div>
      {/* Card thay thế Jumbotron với hình nền và kiểu chữ đẹp hơn */}
      <Card className="bg-info text-white text-center" style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?education,learning)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Card.Body>
          <h1 className="display-3 font-weight-bold">Chào Mừng Đến Với Learn English Online</h1>
          <p className="lead">Học tiếng Anh mọi lúc, mọi nơi, với phương pháp hiệu quả và đội ngũ giảng viên chuyên nghiệp.</p>
          <Button variant="light" size="lg" href="#about" className="shadow-lg">Tìm Hiểu Thêm</Button>
        </Card.Body>
      </Card>

      {/* Giới Thiệu */}
      <Container id="about" className="my-5">
        <h2 className="text-center mb-4 font-weight-bold" style={{ fontSize: '2.5rem', color: '#007BFF' }}>Về Chúng Tôi</h2>
        <Row>
          <Col md={12}>
            <p>
              <strong>Learn English Online</strong> là nền tảng học tiếng Anh trực tuyến, giúp bạn học mọi lúc, mọi nơi. Chúng tôi cung cấp các khóa học tiếng Anh với giảng viên bản ngữ, giúp bạn nâng cao kỹ năng giao tiếp, nghe, nói, đọc và viết.
            </p>
            <p>
              Với phương pháp học linh hoạt, bạn có thể tự học ở bất kỳ đâu và vào thời gian rảnh của mình. Website của chúng tôi cung cấp các khóa học từ cơ bản đến nâng cao, phục vụ cho mọi nhu cầu học tập của bạn.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Tính Năng */}
      <Container id="features" className="my-5">
        <h2 className="text-center mb-4 font-weight-bold" style={{ fontSize: '2.5rem', color: '#007BFF' }}>Tính Năng Nổi Bật</h2>
        <Row>
          <Col md={4}>
            <div className="text-center">
              <FaChalkboardTeacher size={60} className="mb-3" />
              <h4>Khóa Học Linh Hoạt</h4>
              <p>Các khóa học được thiết kế để bạn có thể học ở bất kỳ đâu, trên bất kỳ thiết bị nào, giúp bạn dễ dàng tiếp cận và học tập hiệu quả.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center">
              <FaGraduationCap size={60} className="mb-3" />
              <h4>Giảng Viên Bản Ngữ</h4>
              <p>Học với giảng viên bản ngữ, giúp bạn cải thiện khả năng phát âm và học được các kỹ năng giao tiếp thực tế.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center">
              <FaHeadset size={60} className="mb-3" />
              <h4>Được Hỗ Trợ 24/7</h4>
              <p>Chúng tôi luôn có mặt để hỗ trợ bạn trong suốt quá trình học tập, giải đáp mọi thắc mắc và giúp bạn tiến bộ nhanh chóng.</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Liên Hệ */}
      <Container id="contact" className="my-5 text-center">
        <h2 className="font-weight-bold mb-4" style={{ fontSize: '2.5rem', color: '#007BFF' }}>Liên Hệ Với Chúng Tôi</h2>
        <p className="mb-4">Bạn có bất kỳ câu hỏi nào? Hãy liên hệ với chúng tôi qua email: <a href="mailto:support@learnenglishonline.com" style={{ color: '#007BFF' }}>support@learnenglishonline.com</a></p>
        <Button variant="primary" size="lg" href="mailto:support@learnenglishonline.com" className="shadow-lg">Gửi Email</Button>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <Container>
          <Row>
            <Col md={3}>
              <h5>Giới Thiệu</h5>
              <ul className="list-unstyled">
                <li><a href="#about" className="text-white">Về Chúng Tôi</a></li>
                <li><a href="#features" className="text-white">Tính Năng</a></li>
                <li><a href="#contact" className="text-white">Liên Hệ</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>Khóa Học</h5>
              <ul className="list-unstyled">
                <li><a href="#beginner" className="text-white">Khóa Học Cơ Bản</a></li>
                <li><a href="#intermediate" className="text-white">Khóa Học Trung Cấp</a></li>
                <li><a href="#advanced" className="text-white">Khóa Học Nâng Cao</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>Chính Sách</h5>
              <ul className="list-unstyled">
                <li><a href="#terms" className="text-white">Điều Khoản Sử Dụng</a></li>
                <li><a href="#privacy" className="text-white">Chính Sách Bảo Mật</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>Theo Dõi Chúng Tôi</h5>
              <ul className="list-unstyled">
                <li><a href="https://www.facebook.com" target="_blank" className="text-white">Facebook</a></li>
                <li><a href="https://twitter.com" target="_blank" className="text-white">Twitter</a></li>
                <li><a href="https://www.instagram.com" target="_blank" className="text-white">Instagram</a></li>
              </ul>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12}>
              <p>&copy; 2025 Learn English Online. Tất cả quyền lợi được bảo lưu.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;
