import React, { useEffect, useState } from "react";
import "../booking/booking.css";
import "../../GlobalStyles/glbStyles.css";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Stepbar from "../../components/StepBar/stepbar";
import BookingHeader from "../../components/Booking-header/bookingHeader";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Trip8AM from "../../components/trip8am/trip8AM";
import Trip12AM from "../../components/trip12am/trip12AM";

const Booking = () => {
  const [key, setKey] = useState("8:00");
  const [selectedSeats, setSelectedSeats] = useState({});
  const [timer, setTimer] = useState({});
  const [intervalIds, setIntervalIds] = useState({});
  const [priceInfor, setPriceInfor] = useState({
    "8:00": {
      special: {
        quantity: 10,
        remaining: 10,
        adultPrice: 260000,
        childPrice: 190000,
      },
      regular: {
        quantity: 78,
        remaining: 78,
        adultPrice: 320000,
        childPrice: 270000,
      },
    },
    "12:00": {
      special: {
        quantity: 10,
        remaining: 10,
        adultPrice: 260000,
        childPrice: 190000,
      },
      regular: {
        quantity: 78,
        remaining: 78,
        adultPrice: 320000,
        childPrice: 270000,
      },
    },
  });
  const currentPriceInfor = priceInfor[key];

  const handleSeatSelection = (seat, ticketType) => {
    setSelectedSeats((prev) => ({
      ...prev,
      [seat]: ticketType,
    }));
    startTimer(seat);
    updateRemainingSeats(ticketType, -0.5);
  };

  const updateRemainingSeats = (ticketType, change) => {
    setPriceInfor((prevPriceInfor) => {
      const updatedInfor = { ...prevPriceInfor };
      updatedInfor[key][ticketType].remaining += change;
      return updatedInfor;
    });
  };

  const startTimer = (seat) => {
    clearInterval(intervalIds[seat]);
    setTimer((prev) => ({
      ...prev,
      [seat]: 1000,
    }));
    const id = setInterval(() => {
      setTimer((prev) => {
        const newTime = prev[seat] - 1;
        if (newTime <= 0) {
          clearInterval(id);
          unselectSeat(seat);
          return { ...prev, [seat]: 0 };
        }
        return { ...prev, [seat]: newTime };
      });
    }, 1000);
    setIntervalIds((prev) => ({
      ...prev,
      [seat]: id,
    }));
  };

  const unselectSeat = (seat) => {
    const ticketType = selectedSeats[seat];
    setSelectedSeats((prev) => {
      const { [seat]: _, ...rest } = prev;
      return rest;
    });
    clearInterval(intervalIds[seat]);
    setTimer((prev) => {
      const { [seat]: _, ...rest } = prev;
      return rest;
    });
    setIntervalIds((prev) => {
      const { [seat]: _, ...rest } = prev;
      return rest;
    });
    updateRemainingSeats(ticketType, 0.5);
  };


  return (
    <>
      <BookingHeader />
      <Stepbar />

      <div className="segment-container container">
        <div className="row">
          <div className="col-md-9">
            <div className="container">
              <div className="segment-info">
                Đặt vé từ <span className="place-name">TP. HỒ CHÍ MINH</span>{" "}
                đến <span className="place-name">VŨNG TÀU</span> ngày 04/06/2024
                <div className="detail-wrap">
                  <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3 special mt-4 nav-tabs"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                  >
                    <Tab
                      className={key === "8:00" ? "active" : ""}
                      eventKey="8:00"
                      title="8:00"
                    >
                      <Trip8AM
                        selectedSeats={selectedSeats}
                        handleSeatSelection={handleSeatSelection}
                        unselectSeat={unselectSeat}
                        timer={timer}
                      />
                    </Tab>
                    <Tab
                      className={key === "12:00" ? "active" : ""}
                      eventKey="12:00"
                      title="12:00"
                    >
                      <Trip12AM
                        selectedSeats={selectedSeats}
                        handleSeatSelection={handleSeatSelection}
                        unselectSeat={unselectSeat}
                        timer={timer}
                      />
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="book-sidebar">
              <div className="price-info">
                <div className="direction"></div>
                <div className="title">CHIỀU ĐI</div>
                <div className="content">
                  <ul className="nav-tab">
                    {Object.keys(selectedSeats).length > 0 && (
                      <>
                        <div className="wrap-nav-tab">
                          <h4>Ghế đang giữ</h4>
                          {Object.keys(selectedSeats).map((seat) => (
                            <div className="item" key={seat}>
                              <div className="seat-item">Ghế {seat}</div>
                              <div className="time-item">{timer[seat]}</div>
                              <div>
                                <i
                                  className="bi bi-trash"
                                  onClick={() => unselectSeat(seat)}
                                ></i>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    <li className="nav-item">
                      <Link to="/">Thường</Link>
                    </li>
                  </ul>

                  <div className="tab-content roboto-regular">
                    <div className="prices">
                      <h4>
                        Vé đặc biệt đặt trước 1 ngày (Áp dụng vé người lớn)
                      </h4>
                      <div className="item">
                        <div className="name">Số lượng:</div>
                        <div className="price">{currentPriceInfor.special.quantity}</div>
                      </div>
                      <div className="item">
                        <div className="name">Còn lại:</div>
                        <div className="price">{currentPriceInfor.special.remaining}</div>
                      </div>
                      <div className="item">
                        <div className="name">Người lớn:</div>
                        <div className="price">{currentPriceInfor.special.adultPrice}</div>
                      </div>
                      <div className="item">
                        <div className="name">Trẻ em:</div>
                        <div className="price">{currentPriceInfor.special.childPrice}</div>
                      </div>
                    </div>
                    <div className="prices">
                      <h4>Vé Thường</h4>
                      <div className="item">
                        <div className="name">Số lượng:</div>
                        <div className="price">
                          {currentPriceInfor.regular.quantity}
                        </div>
                      </div>
                      <div className="item">
                        <div className="name">Còn lại:</div>
                        <div className="price">
                          {currentPriceInfor.regular.remaining}
                        </div>
                      </div>
                      <div className="item">
                        <div className="name">Người lớn:</div>
                        <div className="price">
                          {currentPriceInfor.regular.adultPrice}
                        </div>
                      </div>
                      <div className="item">
                        <div className="name">Trẻ em:</div>
                        <div className="price">
                          {currentPriceInfor.regular.childPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-btm text-center mbot-50 mtop-20">
          <Link to="/passengers">
            <button type="submit">
              <span>Tiếp tục</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Booking;
