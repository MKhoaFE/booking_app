import React from "react";
import "../StepBar/stepbar.css";
import { useLocation } from "react-router-dom";

function Stepbar() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <div className="booking-container">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="step-bar roboto-medium">
                <div className="item">Tìm kiếm</div>
                <div className={`item ${pathname === '/booking/seats'?'active' :''}`}>Chọn chỗ ngồi</div>
                <div className={`item ${pathname === '/booking/passengers'?'active' :''}`}>Thông tin hành khách</div>
                <div className={`item ${pathname === '/booking/payment'?'active' :''}`}>Thanh toán</div>
                <div className="item">Kết thúc</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stepbar;
