import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Carousel, Button, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import image1 from "../product45.svg";
import image2 from "../product46.svg";
import image3 from "../product74.svg";
import Image4 from "../product8.svg";
import image5 from "../product7.svg";
import image6 from "../product56.svg";
import image7 from "../product79.svg";
import image8 from "../product70.svg";
import image9 from "../product71.svg";
import image10 from "../product72.svg";
import image11 from "../product67.svg";
import logo from "../logo.svg";
import "./home.css";

function Home() {
    const [khoaHoc, setKhoaHoc] = useState([]);
    const [error, setError] = useState(null);
    const scrollContainerRef = useRef(null);
    const speedRef = useRef(1); // Sử dụng useRef để giữ giá trị speed
    const manualScrollRef = useRef(null);
    useEffect(() => {
        axios
            .get("http://localhost:3000/khoahocs")
            .then((res) => {
                console.log(res.data);
                setKhoaHoc(res.data);
            })
            .catch((err) => {
                console.error("Lỗi khi gọi API:", err);
                setError("Không thể tải dữ liệu khóa học.");
            });
    }, []);

   useEffect(() => {
    if (khoaHoc.length === 0) return;

    const container = scrollContainerRef.current;
    let animationFrame;
    let position = 0;
    let isPaused = false;
    let pauseTimeout;
    const cardWidth = 250 + 15; // Width of card + margin
    let currentCard = 0;
    
    const animate = () => {
        if (isPaused) {
            animationFrame = requestAnimationFrame(animate);
            return;
        }
        
        position += speedRef.current;
        
        // Check if we've scrolled to the next card
        if (position >= (currentCard + 1) * cardWidth) {
            currentCard++;
            // Pause for 1 second after each card
            isPaused = true;
            pauseTimeout = setTimeout(() => {
                isPaused = false;
            }, 1000); // Pause for 1 second
        }
        
        // Reset when reaching the end
        if (position >= container.scrollWidth / 2) {
            position = 0;
            currentCard = 0;
        }
        
        container.scrollLeft = position;
        animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
        cancelAnimationFrame(animationFrame);
        clearTimeout(pauseTimeout);
    };
}, [khoaHoc.length]);
const handleScroll = (direction) => {
        const container = manualScrollRef.current;
        const scrollAmount = 250 + 15; // Số pixel cuộn mỗi lần
        if (direction === 'left') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };


    const handleMouseDown = () => {
        speedRef.current = 0;
    };

    const handleMouseUp = () => {
        speedRef.current = 1;
    };
    

    return (
        <>
            <section className="home-section">
                {/* Section 1: Carousel */}
                <section className="section1">
                    <Container className="text-center mt-4">
                        <Carousel interval={3000} pause={false}>
                            <Carousel.Item>
                                <img className="d-block w-100 image" src={image1} alt="Slide 1" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100 image" src={image2} alt="Slide 2" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100 image" src={image3} alt="Slide 3" />
                            </Carousel.Item>
                        </Carousel>
                    </Container>
                </section>
                
                <section className="section2">
                    <Container>
                        <Row className="align-items-center mt-2">
                            <Col md={6}>
                                <section className="text-start">
                                    <h1 className="fw-bold text-white">Personal online English tutoring</h1>
                                    <p className="text-white">
                                        Get one-on-one English tutoring from experienced instructors. 
                                        Tailor your lessons to your needs and advance your English language skills with personalised support.
                                    </p>
                                </section>
                            </Col>
                            <Col md={6}>
                                <section className="text-end">
                                    <Button variant="primary" className="px-4 py-2">Xem Khóa Học</Button>
                                </section>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="section3 py-5" style={{ backgroundColor: "#d9dcff" }}>
                    <Container>
                        <Row className="align-items-center mb-5">
                        <Col md={6}>
                                <h1 style={{fontSize:"30px"}} className="fw-bold text-dark">
                                    We help you gain confidence and <br/> improve your
                                    <span className="highlight-text">speaking, pronunciation<br/> and vocabulary.</span>
                                </h1>
                                <ul className="list-unstyled">
                                    <li>✔️ Practice in small group classes and private one-to-one classes</li>
                                    <li>✔️ Customise your timetable, choose classes based on your goals and interests</li>
                                    <li>✔️ Choose your level. From beginner to advanced</li>
                                </ul>
                                <Button style={{ width: "150px", height: "40px", fontSize: "14px", marginLeft:"100px", }} variant="primary" className="cta-button rounded-pill px-4 py-2">Get started</Button>
                            </Col>
                            <Col md={6}>
                                <img src={Image4} alt="Illustration" className="img-fluid rounded" />
                            </Col>
                        </Row>

                        {/* Section 2 (Ảnh trái - Nội dung phải) */}
                        <Row className="align-items-center mb-5 flex-md-row-reverse">
                            <Col md={6}>
                                <h1 style={{fontSize:"30px"}} className="fw-bold text-dark">
                                    Target your goals with an English online course designed around your needs
                                </h1>
                                <p className="text-dark" style={{ fontSize: "15px" }}>
                                    Study in your own time and at your own pace. Create the perfect course you need to achieve your goals.
                                </p>
                                <ul className="list-unstyled">
                                    <li>✔️ Choose your lesson themes</li>
                                    <li>✔️ Set your study goals</li>
                                    <li>✔️ Create your lesson schedule</li>
                                </ul>
                                <Button style={{ width: "150px", height: "40px", fontSize: "14px", marginLeft:"100px", }} variant="success" className="mt-3 rounded-pill px-4 py-2">7 Day Free Trial</Button>
                            </Col>
                            <Col md={6}>
                                <img src={image5} alt="Illustration" className="img-fluid rounded" />
                            </Col>
                        </Row>

                        {/* Section 3 (Ảnh phải - Nội dung trái) */}
                        <Row className="align-items-center mb-5">
                            <Col md={6}>
                                <h1 className="fw-bold text-dark">
                                    Plans and pricing to suit your budget and lifestyle
                                </h1>
                                <p className="text-dark" style={{ fontSize: "15px" }}>
                                    Choose from a range of subscription plans and start learning today.
                                </p>
                                <ul className="list-unstyled">
                                    <li>✔️ Flexible monthly payment plans</li>
                                    <li>✔️ Free 7-day trial period</li>
                                    <li>✔️ Cancel anytime</li>
                                </ul>
                                <Button  style={{ width: "150px", height: "40px", fontSize: "14px", marginLeft:"100px", }} variant="danger" className="mt-3 rounded-pill px-4 py-2">7 Day Free Trial</Button>
                            </Col>
                            <Col md={6}>
                                <img src={image3} alt="Illustration" className="img-fluid rounded" />
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="banner text-center text-white py-0">
                <div className="container mt-4">
                    <h1 className="text-center mb-4 text-primary fw-bold">🌟 Danh Sách Khóa Học 🌟</h1>
                    {error && <p className="text-danger text-center">{error}</p>}
                    {khoaHoc.length === 0 && !error && <p className="text-center">Đang tải dữ liệu...</p>}
                    
                    <div className="d-flex align-items-stretch" style={{ minHeight: '300px' }}>
                        {/* First Card - Carousel Card (cố định) */}
                        <div className="mb-3 flex-shrink-0" style={{ width: '450px', marginRight: '20px' }}>
                            <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                                <div className="card-img-top" style={{ height: "200px", overflow: "hidden" }}>
                                    <Carousel interval={3000} pause={false}>
                                        <Carousel.Item>
                                            <img className="d-block w-100 h-100 object-fit-cover" src={image1} alt="Slide 1" />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img className="d-block w-100 h-100 object-fit-cover" src={image2} alt="Slide 2" />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img className="d-block w-100 h-100 object-fit-cover" src={image3} alt="Slide 3" />
                                        </Carousel.Item>
                                    </Carousel>
                                </div>
                                <div className="card-body d-flex flex-column">
                                    {/* Có thể thêm nội dung tại đây */}
                                </div>
                            </div>
                        </div>
                        
                        {/* Dynamic Courses (infinite scroll) */}
                        <div 
                            ref={scrollContainerRef}
                            className="d-flex flex-nowrap overflow-hidden align-items-stretch"
                            style={{ 
                                cursor: 'grab',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                '&::-webkit-scrollbar': { display: 'none' }
                            }}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        >
                            {/* Hiển thị 2 lần để tạo hiệu ứng vô hạn */}
                            {[...khoaHoc, ...khoaHoc].map((khoa, index) => (
                                <div 
                                    key={`${khoa.id}-${index}`} 
                                    className="course-item mb-3 flex-shrink-0" 
                                    style={{ width: '250px', marginRight: '15px' }}
                                >
                                    <div className="card h-100 shadow-sm border-1 rounded-3 overflow-hidden">
                                        {/* Image Section */}
                                        <div className="card-img-top" style={{ height: "90px", overflow: "hidden" }}>
                                            <img 
                                                src={khoa.hinh_anh || "https://via.placeholder.com/300x150"} 
                                                alt={khoa.ten_khoa_hoc}
                                                className="w-100 h-100 object-fit-cover"
                                            />
                                        </div>
                                        
                                        <div className="card-body d-flex flex-column p-2">
                                            <div>
                                                <h5 className="card-title fw-bold text-dark mb-1" style={{ fontSize: "1rem" }}>
                                                    {khoa.ten_khoa_hoc}
                                                </h5>
                                                <p className="card-text text-muted mb-1 text-truncate" style={{ fontSize: "0.8rem" }}>
                                                    {khoa.mo_ta.substring(0, 50)}...
                                                </p>
                                            </div>
                                            <div className="mt-auto">
                                                <NavLink
                                                    to={`/baihoc/${khoa.id}`}
                                                    className="btn btn-primary btn-sm rounded-pill px-3 py-1"
                                                    style={{ fontSize: "0.8rem" }}
                                                >
                                                    Đăng Ký Ngay
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
             <section className="banner text-center text-white py-0">
                <div className="container mt-4 position-relative">
                    <button 
                        className="btn btn-sm btn-outline-primary rounded-circle position-absolute start-0 top-50 translate-middle-y z-1 d-none d-md-flex align-items-center justify-content-center" 
                        style={{
                            width: '30px',
                            height: '30px',
                            left: '-15px',
                            opacity: 0.8,
                            transition: 'all 0.3s'
                        }}
                        onClick={() => handleScroll('left')}
                    >
                        <i className="fas fa-chevron-left"></i>{'<'}
                    </button>
                    
                    {/* Nút điều hướng phải */}
                    <button 
                        className="btn btn-sm btn-outline-primary rounded-circle position-absolute end-0 top-50 translate-middle-y z-1 d-none d-md-flex align-items-center justify-content-center" 
                        style={{
                            width: '30px',
                            height: '30px',
                            right: '-15px',
                            opacity: 0.8,
                            transition: 'all 0.3s',
                        }}
                    
                        onClick={() => handleScroll('right')}
                    >
                        <i className="fas fa-chevron-right"></i>{'>'}
                    </button>
                    
                    <div className="d-flex align-items-stretch" style={{ minHeight: '300px' }}>
                        <div 
                            ref={manualScrollRef}
                            className="d-flex flex-nowrap overflow-hidden align-items-stretch"
                            style={{ 
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                '&::-webkit-scrollbar': { display: 'none' }
                            }}
                        >
                           {[...khoaHoc, ...khoaHoc].map((khoa, index) => (
                                <div 
                                    key={`${khoa.id}-${index}`} 
                                    className="course-item mb-3 flex-shrink-0" 
                                    style={{ width: '250px', marginRight: '15px' }}
                                >
                                    <div className="card h-100 shadow-sm border-1 rounded-3 overflow-hidden">
                                        {/* Image Section */}
                                        <div className="card-img-top" style={{ height: "90px", overflow: "hidden" }}>
                                            <img 
                                                src={khoa.hinh_anh || "https://via.placeholder.com/300x150"} 
                                                alt={khoa.ten_khoa_hoc}
                                                className="w-100 h-100 object-fit-cover"
                                            />
                                        </div>
                                        
                                        <div className="card-body d-flex flex-column p-2">
                                            <div>
                                                <h5 className="card-title fw-bold text-dark mb-1" style={{ fontSize: "1rem" }}>
                                                    {khoa.ten_khoa_hoc}
                                                </h5>
                                                <p className="card-text text-muted mb-1 text-truncate" style={{ fontSize: "0.8rem" }}>
                                                    {khoa.mo_ta.substring(0, 50)}...
                                                </p>
                                            </div>
                                            <div className="mt-auto">
                                                <NavLink
                                                    to={`/baihoc/${khoa.id}`}
                                                    className="btn btn-primary btn-sm rounded-pill px-3 py-1"
                                                    style={{ fontSize: "0.8rem" }}
                                                >
                                                    Đăng Ký Ngay
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
                <section className="py-5 bg-light">
                    <Container>
                        <Row className="align-items-center">
                            <Col md={6}>
                                <h2 className="fw-bold text-primary">Meet Emmanouil</h2>
                                <p className="text-muted">A British Council approved tutor</p>

                                {/* Đánh giá 1 */}
                                <div className="d-flex align-items-start mb-3">
                                <img
                                    src="https://via.placeholder.com/60"
                                    alt="Joseph S."
                                    className="rounded-circle me-3"
                                />
                                <div>
                                    <h5 className="fw-bold">⭐ ⭐ ⭐ ⭐ ⭐ • Joseph S.</h5>
                                    <p className="text-muted">
                                    "Emmanouil is very nice, he's easily understandable, and his teaching is brilliant. Highly recommended!"
                                    </p>
                                </div>
                                </div>

                                {/* Đánh giá 2 */}
                                <div className="d-flex align-items-start mb-3">
                                <img
                                    src="https://via.placeholder.com/60"
                                    alt="Githa N."
                                    className="rounded-circle me-3"
                                />
                                <div>
                                    <h5 className="fw-bold">⭐ ⭐ ⭐ ⭐ ⭐ • Githa N.</h5>
                                    <p className="text-muted">
                                    "An hour class feels like a minute. Manoli helps me improve my vocab and pronunciation. He's kind and fun."
                                    </p>
                                </div>
                                </div>

                                {/* Thông tin giảng viên */}
                                <Card className="p-3 border-0 shadow-sm mb-3">
                                <p className="fw-bold">
                                    <i className="bi bi-patch-check-fill text-primary me-2"></i> 15+ years of teaching experience
                                </p>
                                <p className="fw-bold">
                                    <i className="bi bi-award-fill text-primary me-2"></i> TESOL qualified tutor
                                </p>
                                </Card>
                            </Col>

                            {/* Cột bên phải - Video */}
                            <Col md={6}>
                                <div className="ratio ratio-16x9 mb-4">
                                <iframe
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                    title="Meet Emmanouil"
                                    allowFullScreen
                                ></iframe>
                                </div>

                                {/* Nút CTA */}
                                <Button variant="danger" className="w-100 py-3 rounded-pill fw-bold">
                                Get my $1 session
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="outcomes-section py-5 bg-white">
                    <Container>
                        <h2 className="text-center fw-bold mb-4">Bạn sẽ đạt được gì sau khóa học?</h2>
                        <Row className="text-center">
                            <Col md={4} className="mb-4">
                                <Card className="p-4 shadow-sm border-0">
                                    <Card.Img variant="top" src={image6} className="mx-auto rounded-circle" style={{ width: "80px" }} />
                                    <Card.Body>
                                        <Card.Title className="fw-bold">Giao tiếp tự tin</Card.Title>
                                        <Card.Text>
                                            Bạn có thể trò chuyện với người nước ngoài một cách tự nhiên, không còn e ngại.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="mb-4">
                                <Card className="p-4 shadow-sm border-0">
                                    <Card.Img variant="top" src={image7} className="mx-auto rounded-circle" style={{ width: "80px" }} />
                                    <Card.Body>
                                        <Card.Title className="fw-bold">Phát âm chuẩn</Card.Title>
                                        <Card.Text>
                                            Cải thiện khả năng phát âm, nói chuẩn theo giọng Anh - Mỹ.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="mb-4">
                                <Card className="p-4 shadow-sm border-0">
                                    <Card.Img variant="top" src={image8} className="mx-auto rounded-circle" style={{ width: "80px" }} />
                                    <Card.Body>
                                        <Card.Title className="fw-bold">Ngữ pháp vững chắc</Card.Title>
                                        <Card.Text>
                                            Hiểu và áp dụng đúng ngữ pháp trong các tình huống giao tiếp thực tế.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="text-center">
                            <Col md={4} className="mb-4">
                                <Card className="p-4 shadow-sm border-0">
                                    <Card.Img variant="top" src={image9} className="mx-auto rounded-circle" style={{ width: "80px" }} />
                                    <Card.Body>
                                        <Card.Title className="fw-bold">Từ vựng phong phú</Card.Title>
                                        <Card.Text>
                                            Nắm vững nhiều từ vựng theo từng chủ đề, giúp bạn diễn đạt dễ dàng hơn.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="mb-4">
                                <Card className="p-4 shadow-sm border-0">
                                    <Card.Img variant="top" src={image10} className="mx-auto rounded-circle" style={{ width: "80px" }} />
                                    <Card.Body>
                                        <Card.Title className="fw-bold">Tư duy phản xạ</Card.Title>
                                        <Card.Text>
                                            Tăng tốc độ phản xạ khi giao tiếp mà không cần dịch trong đầu.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="mb-4">
                                <Card className="p-4 shadow-sm border-0">
                                    <Card.Img variant="top" src={image11} className="mx-auto rounded-circle" style={{ width: "80px" }} />
                                    <Card.Body>
                                        <Card.Title className="fw-bold">Cơ hội nghề nghiệp</Card.Title>
                                        <Card.Text>
                                            Tự tin tham gia phỏng vấn bằng tiếng Anh và có cơ hội làm việc quốc tế.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </section>

            <footer className="footer">
                <Container>
                    <div className="footer-content">
                        <img 
                            src={logo} 
                            alt="Logo" 
                            className="footer-logo" 
                        />
                        <p>
                            Cung cấp các khóa học tiếng Anh chất lượng cao giúp bạn tự tin giao tiếp và phát triển sự nghiệp.
                        </p>
                        <ul>
                            <li><a href="/about">Về chúng tôi</a></li>
                            <li><a href="/courses">Khóa học</a></li>
                            <li><a href="/contact">Liên hệ</a></li>
                            <li><a href="/policy">Chính sách bảo mật</a></li>
                            <li><a href="/terms">Điều khoản sử dụng</a></li>
                        </ul>
                        <p className="copyright">
                            &copy; {new Date().getFullYear()} Bản quyền thuộc về công ty của bạn. Mọi quyền được bảo lưu.
                        </p>
                    </div>
                </Container>
            </footer>
        </>
    );
}

export default Home;