import React, { useState } from "react";
import "../login/login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "../../GlobalStyles/glbStyles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import Cookies from "js-cookie";

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
      alert("Vui lòng điền đủ thông tin");
      return;
    }
    const formData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      const { token, user } = response.data; // Giả định backend trả về cả token và thông tin người dùng

      // Lưu JWT và thông tin người dùng vào cookie
      Cookies.set('token', token, { expires: 1 });
      Cookies.set('user', JSON.stringify(user), { expires: 1 });
      window.dispatchEvent(new Event('cookieChange'));
      alert("Đăng nhập thành công");
      navigate("/");
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      alert("Sai tài khoản hoặc mật khẩu");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <>
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
                  Đăng nhập sử dụng tài khoản mạng xã hội{" "}
                </div>
                <Link to="#">
                  <div className="fb container">
                    <button className="left">
                      <i class="fa fa-facebook" aria-hidden="true"></i>
                    </button>
                    <button className="right">
                      <span>Đăng nhập với facebook</span>
                    </button>
                  </div>
                </Link>
                <Link>
                  <div className="gg container">
                    <button className="left">
                      <i class="fa fa-google" aria-hidden="true"></i>
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
                      className={
                        password === "" && passwordError ? "error" : ""
                      }
                    />
                    {password === "" && passwordError && (
                      <span className="error-message">{passwordError}</span>
                    )}
                  </div>
                  <div className="form-group mid">
                    <div className="remember">
                      <input type="checkbox" id="remember" />
                      Ghi nhớ
                    </div>

                    <Link to="/forgot-password">
                      <button>Quên mật khẩu?</button>
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
    </>
  );
}

export default Login;
