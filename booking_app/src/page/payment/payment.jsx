import React from "react";
import BookingHeader from "../../components/Booking-header/bookingHeader";
import Stepbar from "../../components/StepBar/stepbar";
import "../payment/payment.css";

function Payment() {
  return (
    <>
      <BookingHeader></BookingHeader>
      <Stepbar></Stepbar>
      <div className="container payment-wrap">
        <h1>phương thức thanh toán</h1>
        <h4>Quý khách hàng vui lòng chọn hình thức thanh toán</h4>
        <p>
          <i>
            (Sau khi thanh toán thành công đơn hàng, Greenlines-DP sẽ xuất vé và
            gửi vé điện tử qua email cho quý khách. Quý khách vui lòng chọn hình
            thức thanh toán tiên lợi nhất cho mình)
          </i>
        </p>
      </div>
    </>
  );
}

export default Payment;
