import React, { useContext, useEffect, useState } from "react";
import "../Header/header.css";
import "@fontsource/roboto/700.css";
import EmailIcon from "@mui/icons-material/Email";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import logo1 from "../../assets/google-play.png";
import logo2 from "../../assets/app-store.png";
import { Button } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo_header from "../../assets/logo-image.png";
import english from "../../assets/english.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthContext } from "../../context/Auth.context";
function HeaderComponent() {
  const [userName, setUserName] = useState("");
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [currentUserName, setCurrentUserName] = useState(userName);

  useEffect(() => {
    setCurrentUserName(userName);
  }, [userName]);
  // Hàm cập nhật user từ cookie
  const updateUserNameFromCookie = () => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const user = JSON.parse(userCookie);
      setUserName(user.name);
    } else {
      setUserName("");
    }
  };

  const handleLogout = async () => {
    try {
      // Gọi API logout
      const token = Cookies.get("token"); // Lấy token từ cookie
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Xóa cookie sau khi đăng xuất
      Cookies.remove("user");
      Cookies.remove("token");
      logout(); 
      setUserName("");

    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      alert("Đăng xuất thất bại!");
    }
  };

  useEffect(() => {
    const userCookie = Cookies.get("user");
    // Lấy tên user khi component được mount
    updateUserNameFromCookie();

    // Lắng nghe sự thay đổi trên sự kiện window để cập nhật user
    window.addEventListener("cookieChange", updateUserNameFromCookie);
    if (userCookie) {
      const user = JSON.parse(userCookie);
      setUserName(user.name); // Hiển thị tên từ thông tin người dùng trong cookie
    }
    return () => {
      window.removeEventListener("cookieChange", updateUserNameFromCookie);
    };
  }, []);
  return (
    <div className="navbar roboto-medium">
      <div className="top">
        <div className="container">
          <div className="wrapper">
            <div className="left">
              <span>
                <EmailIcon />
                contact@greenlines-dp.com.vn
              </span>
              <span>
                <PhoneEnabledIcon />
                Ticket Hotlines: 0988 009 579
              </span>
            </div>
            <div className="right">
              <span>
                <YouTubeIcon />
              </span>
              <span>
                <FacebookIcon />
              </span>
              <img src={logo1} alt="" />
              <img src={logo2} alt="" />
  
              {isAuthenticated ? (
                <>
                  <strong>Xin chào, {currentUserName}</strong>{" "}
                  <button
                    onClick={handleLogout}
                    style={{ background: "none", color: "white" }}
                  >
                    logout
                  </button>
                </>
              ) : (
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button
                    style={{
                      background: "none",
                      color: "white",
                      border: "none",
                    }}
                  >
                    Đăng nhập
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bottom roboto-medium">
        <div className="container " style={{ width: "100%" }}>
          <Navbar expand="lg">
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Brand href="#" style={{ padding: "1rem 0", margin: "0" }}>
              <Link to="/">
                <img src={logo_header} alt="" />
              </Link>
            </Navbar.Brand>

            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="ms-auto me-auto my-2 my-lg-0 gap-4"
                style={{ maxHeight: "auto", padding: "1rem 0" }}
                navbarScroll
              >
                <Nav.Link href="#action1">TRANG CHỦ</Nav.Link>
                <Nav.Link href="#action2">COMBO</Nav.Link>
                <Nav.Link href="#action3">GIỚI THIỆU</Nav.Link>
                <NavDropdown title="DỊCH VỤ" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">
                    TÀU HAI THÂN
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    TÀU RIB RX
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action5">ĐẠI LÝ</NavDropdown.Item>
                  <NavDropdown.Item href="#action5">
                    CHỤP ẢNH CƯỚI DU THUYỀN
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action5">
                    TIỆC SINH NHẬT TRÊN DU THUYỀN
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action5">
                    TUAR DU NGOẠN TRÊN SÔNG SÀI GÒN
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#action3">KHUYẾN MÃI</Nav.Link>
                <Nav.Link href="#action3">TIN TỨC</Nav.Link>
                <Nav.Link href="#action3">LIÊN HỆ</Nav.Link>
                <Nav.Link href="#action3">TÌM KIẾM VÉ</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Form className="d-block">
              <Button
                variant="outline-success"
                style={{
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={english} alt="" />
              </Button>
              <div className="responsive-hide-loginbtn">
                <Link to="/login">Đăng nhập</Link>
              </div>
            </Form>
          </Navbar>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
