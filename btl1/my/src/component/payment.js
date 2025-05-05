import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import payment1 from "../payment1.svg";
import payment2 from "../payment2.svg";
import payment3 from "../payment3.svg";
import payment4 from "../payment4.svg";
import product38 from "../product38.svg";
import logo from "../logo.svg";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");  // Chọn phương thức thanh toán
  const [amount] = useState(500000);  // Giá cố định
  const [countdown, setCountdown] = useState(300);  // 5 phút
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [courseInfo, setCourseInfo] = useState(null);  // Thông tin khóa học

  // Đếm ngược
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Gọi API để lấy thông tin khóa học
    const fetchCourseInfo = async () => {
      try {
        const response = await fetch('http://localhost:3000/khoahocs');  // Thay bằng URL của bạn
        const data = await response.json();

        // Lọc dữ liệu cần thiết
        const requiredData = {
          courseName: data.ten_khoa_hoc,  // Tên khóa học
          subscriptionDate: new Date().toLocaleString(),  // Thời gian đăng ký
          price: data.gia,  // Giá khóa học
        };

        // Lưu thông tin vào state và localStorage
        setCourseInfo(requiredData);
        localStorage.setItem("courseInfo", JSON.stringify(requiredData));
      } catch (error) {
        console.error('Lỗi khi lấy thông tin khóa học:', error);
      }
    };

    fetchCourseInfo();
  }, []);  // Gọi API khi trang load lần đầu tiên

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán.");
      return;
    }

    // Lưu thông tin khóa học vào localStorage sau khi thanh toán thành công
    if (courseInfo) {
      localStorage.setItem("courseInfo", JSON.stringify(courseInfo));
    }

    alert(`Thanh toán thành công bằng phương thức: ${paymentMethod}`);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} className="mx-auto">
          <div className="text-center mb-4">
            <img width="100px" height="100px" src={logo} alt="Website Banner" className="img-fluid" />
            <h3 className="mt-3">Check out</h3>
          </div>

          <div className="mb-4">
            <p id="back-button" style={{ cursor: "pointer" }}>
              <strong>⭠ Back</strong>
            </p>
            <h1 className="h4 mb-4"><strong>Online subscription payment</strong></h1>
            <hr width="50px" size="4px" />

            {/* === Thêm phần chọn phương thức thanh toán === */}
            <Form.Group className="mb-3">
              <Form.Label><strong>Chọn phương thức thanh toán</strong></Form.Label>

              <Form.Check 
                type="radio"
                label="Thẻ ngân hàng / Credit Card"
                name="paymentMethod"
                value="Card"
                checked={paymentMethod === "Card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Form.Check 
                type="radio"
                label="Momo E-Wallet"
                name="paymentMethod"
                value="Momo"
                checked={paymentMethod === "Momo"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Form.Check 
                type="radio"
                label="Chuyển khoản ngân hàng"
                name="paymentMethod"
                value="BankTransfer"
                checked={paymentMethod === "BankTransfer"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Form.Group>
            {/* === Kết thúc phần chọn phương thức === */}

            <div className="d-flex align-items-center mb-3">
              <img width="30px" height="30px" src={product38} alt="Card Icon" />
              <p className="ms-2 mb-0">Card</p>
            </div>
            <p>We accept all major credit and debit cards.</p>
            <ul className="list-unstyled d-flex">
              <li className="me-2"><img width="100px" height="30px" src={payment1} alt="Visa" /></li>
              <li className="me-2"><img width="30px" height="30px" src={payment2} alt="MasterCard" /></li>
              <li className="me-2"><img width="30px" height="30px" src={payment3} alt="Amex" /></li>
              <li className="me-2"><img width="30px" height="30px" src={payment4} alt="JCB" /></li>
            </ul>

            {/* Nếu phương thức chọn là Card thì mới hiện form nhập thẻ */}
            {paymentMethod === "Card" && (
              <div id="paymentInfo">
                <h3><strong>Card details</strong></h3>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Cardholder's name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name on card"
                      value={cardholderName}
                      onChange={(e) => setCardholderName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Card number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Card number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Expiry</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Expiration date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Security code (CVV)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </div>
            )}

            <Button variant="primary" onClick={handlePayment} className="mt-3">
              Thanh toán {amount.toLocaleString()} VND
            </Button>

            <div className="mt-4">
              <h3>Time remaining</h3>
              <div id="countdown-timer" style={{ fontSize: "18px" }}>
                <span>{formatTime(countdown)}</span>
              </div>
            </div>

            <div className="mt-4">
              <h1>Phương thức đã chọn: {paymentMethod || "(chưa chọn)"}</h1>
              <div className="subscription-plan mb-4">
                <p><strong>Subscribe plan includes:</strong></p>
                <ul>
                  <li>Fun exercises created by English experts</li>
                  <li>Earn certificates and badges</li>
                  <li>Be part of a global community</li>
                  <li>On-the-go, affordable learning</li>
                </ul>
              </div>
              <h3>Total: {amount.toLocaleString()} VND</h3>
              <Button id="complete-payment" variant="success" onClick={handlePayment}>
                Complete Payment
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
