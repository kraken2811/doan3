import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserManagement = ({ userRole }) => {
  // State cho người dùng, tìm kiếm và thông tin người dùng mới
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // State cho filteredUsers
  const [searchQuery, setSearchQuery] = useState("");
  const [newUser, setNewUser] = useState({
    ho_ten: "",
    email: "",
    password: "",
    sdt: "",
    vai_tro: "giao_vien", // Vai trò mặc định là giáo viên
  });

  // Lọc người dùng theo từ khóa tìm kiếm
  useEffect(() => {
    const filtered = users.filter((user) => {
      const userName = user.ho_ten ? user.ho_ten.toLowerCase() : "";
      const userEmail = user.email ? user.email.toLowerCase() : "";
      const searchTerm = searchQuery.toLowerCase();
      return userName.includes(searchTerm) || userEmail.includes(searchTerm);
    });

    setFilteredUsers(filtered); // Cập nhật filteredUsers sau khi lọc
  }, [users, searchQuery]); // Khi `users` hoặc `searchQuery` thay đổi, sẽ lọc lại

  // Fetch danh sách người dùng từ API khi component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setUsers(response.data); // Cập nhật danh sách người dùng
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu người dùng:", error));
  }, []);

  // Hàm xử lý tìm kiếm người dùng
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Hàm xử lý thêm người dùng
  const handleAddUser = () => {
    if (newUser.vai_tro === "hoc_vien") {
      alert("Admin không có quyền thêm học viên!");
      return;
    }

    // Gửi request thêm người dùng mới
    axios
      .post("http://localhost:3000/users", newUser)
      .then((response) => {
        alert("Thêm người dùng thành công!");
        setUsers((prevUsers) => [...prevUsers, response.data]); // Cập nhật người dùng mới vào danh sách
        setNewUser({
          ho_ten: "",
          email: "",
          password: "",
          sdt: "",
          vai_tro: "giao_vien", // Reset lại vai trò về mặc định
        });
      })
      .catch((error) => {
        console.error("Lỗi khi thêm người dùng:", error);
      });
  };

  // Hàm xử lý xóa người dùng
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      axios
        .delete(`http://localhost:3000/users/${id}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== id)); // Cập nhật lại danh sách sau khi xóa
        })
        .catch((error) => console.error("Lỗi khi xóa người dùng:", error));
    }
  };

  return (
    <div className="container">
      <h2>Quản lý Người Dùng</h2>

      {/* Thanh tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm người dùng..."
        value={searchQuery}
        onChange={handleSearch}
        className="form-control mb-3"
      />

      {/* Form thêm người dùng */}
      <div className="mb-3">
        <h4>Thêm người dùng mới</h4>
        <input
          type="text"
          placeholder="Tên người dùng"
          value={newUser.ho_ten}
          onChange={(e) => setNewUser({ ...newUser, ho_ten: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Số điện thoại"
          value={newUser.sdt}
          onChange={(e) => setNewUser({ ...newUser, sdt: e.target.value })}
          className="form-control mb-2"
        />
        <select
          value={newUser.vai_tro}
          onChange={(e) => setNewUser({ ...newUser, vai_tro: e.target.value })}
          className="form-control mb-3"
        >
          <option value="giao_vien">Giáo viên</option>
          <option value="admin">Admin</option>
          {userRole === "admin" && <option value="hoc_vien">Học viên</option>}
        </select>
        <button onClick={handleAddUser} className="btn btn-primary">
          Thêm người dùng
        </button>
      </div>

      {/* Bảng hiển thị người dùng */}
      <table className="table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.ho_ten}</td>
              <td>{user.email}</td>
              <td>{user.sdt}</td>
              <td>{user.vai_tro}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                  Xóa
                </button>
                <Link to={`/user/edit/${user.id}`} className="btn btn-warning ml-2">
                  Chỉnh sửa
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
