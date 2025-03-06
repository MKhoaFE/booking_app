import React, { useState } from "react";
import BookingHeader from "../../components/Booking-header/bookingHeader";
import Stepbar from "../../components/StepBar/stepbar";

function ByATM() {
  const [selected, setSelected] = useState(null);

  const toggle = (option) => {
    setSelected(selected === option ? null : option);
  };

  return (
    <>
      <BookingHeader />
      <Stepbar />
        <div className="container">
            <div className="line"></div>
        </div>
    </>
  );
}

export default ByATM;
