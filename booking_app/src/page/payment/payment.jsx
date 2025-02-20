import React, { useState } from "react";
import BookingHeader from "../../components/Booking-header/bookingHeader";
import Stepbar from "../../components/StepBar/stepbar";
import "../payment/payment.css";

function Payment() {
  const [selected, setSelected] = useState(null);

  const toggle = (option) => {
    setSelected(selected === option ? null : option);
  };
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
        <div className="option" onClick={() => toggle("credit")}>
          <h3>Thanh toán bằng thẻ tín dụng (Visa - master card)</h3>
        </div>
        {selected === "credit" && <div className="content">test content 1</div>}
        <div className="option" onClick={() => toggle("atm")}>
          <h3>Thanh toán bằng thẻ ATM</h3>
        </div>
        {selected === "atm" && <div className="content">test content 2</div>}
      </div>
    </>
  );
}

export default Payment;
