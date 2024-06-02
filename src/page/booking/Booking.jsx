import React from "react";
import "../booking/booking.css";
import "../../GlobalStyles/glbStyles.css";

function Booking() {
  return (
    <>
      <div className="background-header"></div>
      <div className="booking-container">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="step-bar roboto-medium">
                <div className="item">Tìm kiếm</div>
                <div className="item active">Chọn chỗ ngồi</div>
                <div className="item">Thông tin hành khách</div>
                <div className="item">Thanh toán</div>
                <div className="item">Kết thúc</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Booking;
