import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Form, FormControl, Button, Offcanvas } from "react-bootstrap";
import { FaUserCircle, FaBars } from "react-icons/fa";
import logo from "../logo.svg";
import "./home.css";

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Kiểm tra xem user đã đăng nhập chưa
    useEffect(() => {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            setUser(JSON.parse(storedUser)); // Nếu có token và user, cập nhật state
        }
    }, []);

    // Xử lý sự kiện khi bấm vào nút user
    const handleLogin = () => {
        if (user) {
            navigate("/User"); // Nếu đã đăng nhập, chuyển đến dashboard
        } else {
            navigate("/login"); // Nếu chưa đăng nhập, chuyển đến trang login
        }
    };

    return (
        <>
            {/* Header chính */}
            <Navbar expand="lg" bg="dark" variant="dark" className="py-3">
                <Container>
                    {/* Logo + Tiêu đề bên trái */}
                    <Navbar.Brand href="/" className="d-flex align-items-center">
                        <img src={logo} alt="logo" width="40" height="40" className="me-2" />
                        <span className="fw-bold fs-5">English Courses</span>
                    </Navbar.Brand>

                    {/* Nút mở menu trên mobile */}
                    <Button variant="outline-light" className="d-lg-none ms-auto" onClick={() => setShowMenu(true)}>
                        <FaBars size={22} />
                    </Button>

                    {/* Thanh tìm kiếm + User */}
                    <div className="d-none d-lg-flex align-items-center ms-auto">
                        <Form className="d-flex me-3">
                            <FormControl style={{ width: "300px", height: "40px", transform: "translateY(10px)" }} type="text" placeholder="Tìm kiếm..." className="me-2" />
                            <Button style={{ width: "40px", height: "40px" }} variant="outline-light" size="sm">🔍</Button>
                        </Form>

                        {/* Nút User */}
                        <Button className="d-flex align-items-center justify-content-center button-user" onClick={handleLogin}>
                            <FaUserCircle size="40" />
                            {user && <span className="ms-2 fw-bold">{user.name}</span>}
                        </Button>
                    </div>
                </Container>
            </Navbar>

            {/* Offcanvas Menu (Chỉ hiển thị trên Mobile) */}
            <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* Thanh tìm kiếm */}
                    <Form className="d-flex mb-3">
                        <FormControl type="text" placeholder="Tìm kiếm..." className="me-2" />
                        <Button variant="primary">🔍</Button>
                    </Form>

                    {/* Nút User */}
                    <Button variant="outline-primary" className="w-100 mb-2" onClick={handleLogin}>
                        <FaUserCircle size={22} className="me-2" /> {user ? "Trang cá nhân" : "Đăng nhập"}
                    </Button>

                    {/* Menu điều hướng */}
                    <Nav className="flex-column">
                        <Nav.Link href="/home" className="fw-bold text-dark">🏠 Trang chủ</Nav.Link>
                        <Nav.Link href="/course" className="fw-bold text-dark">📚 Khóa học</Nav.Link>
                        <Nav.Link href="/homepage" className="fw-bold text-dark">📝 Blog</Nav.Link>
                        <Nav.Link href="/contact" className="fw-bold text-dark">📞 Liên hệ</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Thanh điều hướng (Chỉ hiển thị trên Desktop) */}
            <Navbar bg="light" expand="lg" className="d-none d-lg-block">
                <Container>
                    <Nav className="mx-auto">
                        <Nav.Link href="/gioithieu" className="fw-bold text-dark">Giới thiệu</Nav.Link>
                        <Nav.Link href="/home" className="fw-bold text-dark">Trang chủ</Nav.Link>
                        <Nav.Link href="/course" className="fw-bold text-dark">Khóa học</Nav.Link>
                        <Nav.Link href="/homepage" className="fw-bold text-dark">Blog</Nav.Link>
                        <Nav.Link href="/Support" className="fw-bold text-dark">Liên hệ</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
