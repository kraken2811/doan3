import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap';
import { QRCodeSVG } from 'qrcode.react'; // Đã sửa ở đây
const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const course = state?.course || {};
  
  // Tạo mã sinh viên ngẫu nhiên
  const [studentCode] = useState('SV' + Math.floor(1000 + Math.random() * 9000));
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Dữ liệu QR Momo
  const momoData = {
    studentCode,
    courseName: course.name || 'Khóa học không xác định',
    amount: course.price || '0',
    paymentTime: new Date().toLocaleString(),
    merchantCode: 'MOMO123456' // Mã merchant của bạn
  };

  const qrContent = `momo://payment?data=${encodeURIComponent(JSON.stringify(momoData))}`;

  const handlePayment = () => {
    // Xử lý thanh toán thành công
    setPaymentSuccess(true);
    setTimeout(() => {
      navigate('/payment-success', { 
        state: { 
          studentCode, 
          course,
          paymentTime: new Date().toLocaleString() 
        }
      });
    }, 2000);
  };

  return (
    <Container className="my-5">
      <div>
       <h2 className="text-center mb-4">THANH TOÁN KHÓA HỌC</h2>
      </div>
      <Row className="justify-content-center">
        <Col md={6}>
          {/* Chọn phương thức thanh toán */}
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

          {/* Hiển thị QR Momo khi chọn */}
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
                  
                  <div className="mt-3">
                    <Button variant="success" onClick={handlePayment}>
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
        <Col>
        <Card className="mb-4">
            <Card.Body>
              <Card.Title className="t">Thông tin đơn hàng</Card.Title>
              <Row>
                <Col md={6}>
                  <p><strong>Tên khóa học:</strong> {course.name}</p>
                  <p><strong>Mã sinh viên:</strong> {studentCode}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Số tiền:</strong> {course.price}</p>
                  <p><strong>Thời gian:</strong> {new Date().toLocaleString()}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;