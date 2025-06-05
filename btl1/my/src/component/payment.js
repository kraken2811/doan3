import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Đã thay useLocation bằng useParams
import { Container, Row, Col, Card, Button, Alert, Form, Modal } from 'react-bootstrap';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios'; // Thêm import axios
import './payment.css';

const PaymentPage = () => {
  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  const { courseId } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Lỗi khi phân tích dữ liệu người dùng:", error);
      }
    } else {
      console.error("Không tìm thấy dữ liệu người dùng!");
    }
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/khoahocs/${courseId}`);
        setCourse(response.data);
        setError(null);
      } catch (err) {
        setError("Không thể tải thông tin khóa học");
        console.error("Lỗi khi lấy thông tin khóa học:", err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const momoData = {
    studentCode: user.id ,
    courseName: course.ten_khoa_hoc,
    amount: course.gia,
    paymentTime: new Date().toLocaleString(),
    merchantCode: 'MOMO123456'
  };

  const qrContent = `momo://payment?data=${encodeURIComponent(JSON.stringify(momoData))}`;

  const handlePayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      navigate('/payment-success', { 
        state: { 
          studentCode:  user.id, 
          course,
          paymentTime: new Date().toLocaleString() 
        }
      });
    }, 2000);
  };

  const handleCancelPayment = () => {
    navigate('/');
  };

  const formatPrice = (price) => {
    return price ? new Intl.NumberFormat('vi-VN').format(price) + ' VND' : '0 VND';
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">THANH TOÁN KHÓA HỌC</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Chọn phương thức thanh toán</Card.Title>
              <Form>
                <Form.Check
                  type="radio"
                  id="momo"
                  label="Ví Momo"
                  name="paymentMethod"
                  checked={paymentMethod === 'momo'}
                  onChange={() => setPaymentMethod('momo')}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  id="bank"
                  label="Chuyển khoản ngân hàng"
                  name="paymentMethod"
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  id="cash"
                  label="Tiền mặt"
                  name="paymentMethod"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                />
              </Form>
            </Card.Body>
          </Card>

          {paymentMethod === 'momo' && (
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Quét mã QR Momo</Card.Title>
                <div className="text-center">
                  <div className="mb-3 p-3 bg-light rounded d-inline-block">
                    <QRCodeSVG
                      value={qrContent}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <p className="text-muted">Quét mã QR để thanh toán qua Momo</p>
                  
                  <div className="mt-3 d-flex justify-content-center gap-3">
                    <Button 
                      variant="success" 
                      onClick={handlePayment}
                      size="lg"
                    >
                      Xác nhận đã thanh toán
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}

          {paymentSuccess && (
            <Alert variant="success" className="text-center">
              Thanh toán thành công! Đang chuyển hướng...
            </Alert>
          )}
        </Col>
        
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title className="text-center fw-bold fs-4 mb-4">Thông tin đơn hàng</Card.Title>
              
              <div className="mb-3">
                <h6 className="fw-bold">Thông tin người mua</h6>
                <p className="mb-2">Họ Tên: {user.fullName || user.name || 'Không xác định'}</p>
                <p>Số điện thoại: {user.phone || 'Không xác định'}</p>
                <hr className="my-3" />
              </div>
              
              <div className="mb-3">
                <h6 className="fw-bold">Thông tin khóa học</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tên khóa học:</span>
                  <span>{course.ten_khoa_hoc}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Giá:</span>
                  <span>{formatPrice(course.gia)}</span>
                </div>
                <hr className="my-3" />
              </div>
              
              <div className="mb-3">
                <h6>Thông tin thanh toán</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>Học phí:</span>
                  <span>{formatPrice(course.gia)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Giảm giá:</span>
                  <span>0 VND</span>
                </div>
                <hr className="my-3" />
              </div>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between fw-bold">
                  <span>Tổng tiền:</span>
                  <span>{formatPrice(course.gia)}</span>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          <div className="d-flex justify-content-between mt-4">
            <Button 
              variant="danger" 
              onClick={() => setShowCancelModal(true)}
              size="lg"
            >
              Hủy thanh toán
            </Button>
          </div>
        </Col>
      </Row>

      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận hủy thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc muốn hủy thanh toán không? Thao tác này không thể hoàn tác.
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowCancelModal(false)}
            size="lg"
          >
            Quay lại
          </Button>
          <Button 
            variant="danger" 
            onClick={handleCancelPayment}
            size="lg"
          >
            Xác nhận hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PaymentPage;