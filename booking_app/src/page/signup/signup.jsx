import "../signup/signup.css";
import React, { useState } from "react";
import "../login/login.css";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "../../GlobalStyles/glbStyles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [repassword, setRepassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repasswordError, setRepassworderror] = useState("");
  const [fullnameError, setFullnameerror] = useState("");
  const handleEmailBlur = () => {
    if (email === "") {
      setEmailError("Vui lòng nhập dữ liệu");
    } else {
      setEmailError("");
    }
  };
  const handleRepasswordBlur = () => {
    if (repassword === "") {
      setRepassworderror("Vui lòng nhập dữ liệu");
    } else {
      setRepassworderror("");
    }
  };
  const handleFullnameBlur = () => {
    if (fullname === "") {
      setFullnameerror("Vui lòng nhập dữ liệu");
    } else {
      setFullnameerror("");
    }
  };
  const handlePasswordBlur = () => {
    if (password === "") {
      setPasswordError("Vui lòng nhập dữ liệu");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("fullname: ", fullname);
    console.log("repassword: ", repassword);
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
                    <label>Họ và tên (*)</label>
                    <input
                      type="fullname"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      onBlur={handleFullnameBlur}
                      className={
                        fullname === "" && fullnameError ? "error" : ""
                      }
                    />
                    {fullname === "" && fullnameError && (
                      <span className="error-message">{fullnameError}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Địa chỉ email (*)</label>
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
                    <label>Mật khẩu (*)</label>
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
                  <div className="form-group">
                    <label>Xác nhận mật khẩu (*)</label>
                    <input
                      type="password"
                      value={repassword}
                      onChange={(e) => setRepassword(e.target.value)}
                      onBlur={handleRepasswordBlur}
                      className={
                        repassword === "" && repasswordError ? "error" : ""
                      }
                    />
                    {repassword === "" && repasswordError && (
                      <span className="error-message">{repasswordError}</span>
                    )}
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="login-btn">
                      ĐĂNG KÝ
                    </button>
                    <button type="button" className="cancel-btn">
                      HỦY
                    </button>
                  </div>

                  <div className="sign-up">
                    <span>Đã có tài khoản</span>{" "}
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
    </>
  );
}

export default Signup;
