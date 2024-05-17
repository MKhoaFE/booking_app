import React from "react";
import "../Footer/footer.css";
import logoFooter from "../../assets/logo-footer.png";
import homay from "../../assets/ho_may_logo.png";
import bct from "../../assets/bct.png";
import { colors } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
function FooterComponent() {
  return (
    <div className="footer">
      <div className="top-footer roboto-regular">
        <button className="btn-1">LIÊN HỆ</button>
        <button className="btn-2" style={{padding:"0 1rem"}}><ArrowForwardIcon style={{fontSize:"35px"}} /></button>
      </div>
      <div className="container ">
        <div className="container content">
          <div className="col-md-3 col-sm-3 col-xs-12 content-item">
            <p>Giới thiệu</p>
            <p>Dịch vụ tàu hai thân</p>
            <p>Chính sách thanh toán</p>
            <p>Chính sách đổi trả vé tàu</p>
            <p>Chính sách bảo mật thông tin</p>
          </div>
          <div className="col-md-3 col-sm-3 col-xs-12 content-item">
            <p>Khuyến mãi</p>
            <p>Hướng dẫn thanh toán</p>
            <p>Chính sách giá</p>
            <p>Lịch tàu chạy</p>
            <p>Tra cứu điểm tích lũy</p>
          </div>
          <div className="col-md-3 col-sm-3 col-xs-12 content-item">
            <p>Melinh Point office Building</p>
            <p>02 Ngô Đức Kế, Quận 1, TP.Hồ Chí Minh</p>
            <p style={{color:"yellow"}}>Hotline: 098 800 9579</p>
            <p>Phòng vé Sài Gòn</p>
            <p>Phòng vé Vũng Tàu: 0986 908 907</p>
          </div>
          <div className="col-md-3 col-sm-3 col-xs-12 text-center">

              <img src={logoFooter} alt="" />
              <img src={homay} alt="" />

          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="wrap container">
                  <div className="left col-md-9">
          <p>© 2016 - Công ty TNHH Công Nghệ Xanh DP</p>
          <p>Giấy chứng nhận Đăng ký Kinh doanh số 3500719158 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 21/07/2005</p>
        </div>
        <div className="right col-md-3">
          <img src={bct} alt="" />
        </div>
        </div>

      </div>
    </div>
  );
}

export default FooterComponent;
