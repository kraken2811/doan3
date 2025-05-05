import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/login";
import Home from "./component/home";
import Header from "./component/header";
import 'bootstrap/dist/css/bootstrap.min.css';
import KhoaHoc from "./component/course";
import Register from "./component/slide.js";
import Chatbot from "./component/chatbot.js";
import CourseDetails from "./component/baihoc.js";
import User from "./component/user.js";
import Support from "./component/lienhe.js";
import Admin from "./componentAdmin/Admin.js";
import Dashboard from './componentAdmin/tongquat.js';
import Sidebar from "./componentAdmin/Sidebar.js";
import UserManagement from "./componentAdmin/qluser.js";
import CourseManagement from "./componentAdmin/qlkhoahoc.js";
import CourseDetail from "./componentAdmin/baihoc.js";
import AdminSettings from "./componentAdmin/adminSetting.js";
import PaymentPage from "./component/payment.js";
import HomePage from "./component/gioithieu.js";
import HomePage1 from "./component/homepage.js";

import "./App.css";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const [showChatbot, setShowChatbot] = useState(false);
  return (
    <div>
      <Routes>
  <Route path="/" element={<WithHeader><Home /></WithHeader>} />
  <Route path="/login" element={<Login />} />
  <Route path="/home" element={<WithHeader><Home /></WithHeader>} />
  <Route path="/course" element={<WithHeader><KhoaHoc /></WithHeader>} />
  <Route path="/slide" element={<Register />} />
  <Route path="/baihoc/:courseId" element={<CourseDetails />} />
  <Route path="/user" element={<WithHeader><User /></WithHeader>} />
  <Route path="/support" element={<WithHeader><Support /></WithHeader>} />
  <Route path="/gioithieu" element={<WithHeader><HomePage /></WithHeader>} />
  <Route path="/admin" element={<Admin />} />
  <Route path="/tongquat" element={<WithSidebar><Dashboard /></WithSidebar>} />
  <Route path="/qluser" element={<WithSidebar><UserManagement /></WithSidebar>} />
  <Route path="/qlkhoahoc" element={<WithSidebar><CourseManagement /></WithSidebar>} />
  <Route path="/course/:id" element={<CourseDetail />} />
  <Route path="/sidebar" element={<Sidebar />} />
  <Route path="/payment" element={<PaymentPage />} />
  <Route path="/settings" element={<WithSidebar><AdminSettings /></WithSidebar>} />
  <Route path="/homepage" element={<WithHeader><HomePage1 /></WithHeader>} />
</Routes>


      {!showChatbot && (
          <button className="chatbot-button" onClick={() => setShowChatbot(true)}>💬 Chat</button>
        )}

        {/* Chatbot Component */}
        {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
    </div>
  );
}

const WithHeader = ({ children }) => (
  <>
    <Header />
    <div className="container mt-4">{children}</div>
  </>
);
const WithSidebar = ({ children }) => (
  <div style={{ display: "flex", height: "100vh" }}>
    {/* Sidebar cố định bên trái */}
    <Sidebar style={{ width: '300px', background: '#343a40', color: 'white', position: 'fixed', height: '100vh' }} />
    
    {/* Nội dung trang chính, nằm bên phải Sidebar */}
    <div style={{ marginLeft: '0px', width: 'calc(100% - 250px)', padding: '20px' }}>
      {children}
    </div>
  </div>
);
export default App;
