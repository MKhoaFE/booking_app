import React, { useState } from "react";
import "../login/login.css";
import { Link, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "../../GlobalStyles/glbStyles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import showToast from "../../../../booking_app/src/components/Toastify/Toastify.js";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleEmailBlur = () => {
    if (email === "") {
      setEmailError("Vui lòng nhập email");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email không hợp lệ");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      showToast("Vui lòng nhập email", "error");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      showToast("Email không hợp lệ", "error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/forgotPassword",
        { email }
      );
      showToast(response.data.message, "success"); // "Email reset mật khẩu đã được gửi!"
      setEmail("");
      setTimeout(() => navigate("/login"), 3000); // Quay lại trang đăng nhập sau 3 giây
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi";
      showToast(errorMessage, "error");
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
            <h2>QUÊN MẬT KHẨU</h2>
          </div>
          <div className="wrap">
            <div className="col-md-7 col-xs-12 container">
              <form className="form-login" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    Vui lòng nhập email đã đăng ký để nhận link đặt lại mật khẩu
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailBlur}
                    className={emailError ? "error" : ""}
                    placeholder="Nhập email của bạn"
                  />
                  {emailError && (
                    <span className="error-message">{emailError}</span>
                  )}
                </div>

                <div className="form-actions">
                  <button type="submit" className="login-btn">
                    Gửi Yêu Cầu
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancel}
                  >
                    Quay Lại
                  </button>
                </div>

                <div className="sign-up">
                  <span>Chưa có tài khoản? </span>
                  <Link to="/signup">
                    <button>Đăng ký</button>
                  </Link>
                </div>
                <div className="login-link">
                  <span>Đã nhớ mật khẩu? </span>
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

export default ForgotPassword;