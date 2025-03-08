import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../login/login.css"; // Tái sử dụng CSS từ login
import "font-awesome/css/font-awesome.min.css";
import "../../GlobalStyles/glbStyles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import showToast from "../../../../booking_app/src/components/Toastify/Toastify.js";

function ResetPassword() {
  const { token } = useParams(); // Lấy token từ URL
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError("Vui lòng nhập mật khẩu");
    } else if (password.length < 8) {
      setPasswordError("Mật khẩu phải dài ít nhất 8 ký tự");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password) {
      showToast("Vui lòng nhập mật khẩu", "error");
      return;
    }

    if (password.length < 8) {
      showToast("Mật khẩu phải dài ít nhất 8 ký tự", "error");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/resetPassword/${token}`,
        { password }
      );
      showToast(response.data.message, "success"); // "Đặt lại mật khẩu thành công!"
      setPassword("");
      setTimeout(() => navigate("/login"), 3000); // Quay lại trang đăng nhập sau 3 giây
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi";
      showToast(errorMessage, "error"); // "Token không hợp lệ hoặc đã hết hạn"
      console.error(error.response?.data || error.message);
    }
  };

  const handleCancel = () => {
    navigate("/login");
  };

  return (
    <div className="login-wrapper">
      <div className="bg"></div>
      <div className="login-form">
        <div className="content">
          <div className="title">
            <h2>ĐẶT LẠI MẬT KHẨU</h2>
          </div>
          <div className="wrap">
            <div className="col-md-7 col-xs-12 container">
              <form className="form-login" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Vui lòng nhập mật khẩu mới</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handlePasswordBlur}
                    className={passwordError ? "error" : ""}
                    placeholder="Nhập mật khẩu mới"
                  />
                  {passwordError && (
                    <span className="error-message">{passwordError}</span>
                  )}
                </div>

                <div className="form-actions">
                  <button type="submit" className="login-btn">
                    Xác Nhận
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancel}
                  >
                    Hủy
                  </button>
                </div>

                <div className="login-link">
                  <span>Quay lại </span>
                  <Link to="/login">
                    <button>Đăng nhập</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;