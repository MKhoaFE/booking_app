import React, { useState } from "react";
import "../login/login.css";
import { Link, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "../../GlobalStyles/glbStyles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import Cookies from "js-cookie";
import showToast from "../../../../booking_app/src/components/Toastify/Toastify.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleEmailBlur = () => {
    if (email === "") {
      setEmailError("Vui lòng nhập dữ liệu");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    if (password === "") {
      setPasswordError("Vui lòng nhập dữ liệu");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      showToast("Vui lòng điền đủ thông tin", "error");
      return;
    }
    const formData = { email, password };
    console.log("Sending login request:", formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      const { token, user } = response.data;
      Cookies.set('token', token, { expires: 1/24 });
      Cookies.set('user', JSON.stringify(user), { expires: 3600 });
      window.dispatchEvent(new Event('cookieChange'));
      showToast("Đăng nhập thành công", "success");
      navigate("/");
      window.location.reload();
      console.log("Login response:", response.data);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      showToast("Sai tài khoản hoặc mật khẩu", "error");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="bg"></div>
      <div className="login-form">
        <div className="content">
          <div className="title">
            <h2>ĐĂNG NHẬP</h2>
          </div>
          <div className="wrap">
            <div className="col-md-5 col-xs-12 social-block">
              <div className="title container">
                Đăng nhập sử dụng tài khoản mạng xã hội
              </div>
              <Link to="#">
                <div className="fb container">
                  <button className="left">
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </button>
                  <button className="right">
                    <span>Đăng nhập với facebook</span>
                  </button>
                </div>
              </Link>
              <Link>
                <div className="gg container">
                  <button className="left">
                    <i className="fa fa-google" aria-hidden="true"></i>
                  </button>
                  <button className="right">
                    <span>Đăng nhập với google</span>
                  </button>
                </div>
              </Link>
            </div>
            <div className="col-md-7 col-xs-12 container">
              <form className="form-login" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Địa chỉ email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailBlur}
                    className={email === "" && emailError ? "error" : ""}
                  />
                  {email === "" && emailError && (
                    <span className="error-message">{emailError}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Mật khẩu</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handlePasswordBlur}
                    className={password === "" && passwordError ? "error" : ""}
                  />
                  {password === "" && passwordError && (
                    <span className="error-message">{passwordError}</span>
                  )}
                </div>
                <div className="form-group mid">
                  <div></div>
                  <Link to="forgotPassword">
                    <span>Quên mật khẩu?</span>
                  </Link>
                </div>
                <div className="form-actions">
                  <button type="submit" className="login-btn">
                    ĐĂNG NHẬP
                  </button>
                  <button type="button" className="cancel-btn">
                    HỦY
                  </button>
                </div>
                <div className="sign-up">
                  <span>Chưa có tài khoản</span>{" "}
                  <Link to="/signup">
                    <button>Đăng ký</button>
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

export default Login;