import React, { useState } from "react";
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
  const [selectedSeats8AM, setSelectedSeats8AM] = useState({});
  const [selectedSeats12AM, setSelectedSeats12AM] = useState({});
  const [timer8AM, setTimer8AM] = useState({});
  const [timer12AM, setTimer12AM] = useState({});
  const [intervalIds8AM, setIntervalIds8AM] = useState({});
  const [intervalIds12AM, setIntervalIds12AM] = useState({});
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
  

  const handleSeatSelection = (
    seat,
    ticketType,
    setSelectedSeats,
    setTimer,
    setIntervalIds
  ) => {
    setSelectedSeats((prev) => ({
      ...prev,
      [seat]: ticketType,
    }));
    startTimer(seat, setTimer, setIntervalIds);
    updateRemainingSeats(ticketType, -0.5);
  };

  const updateRemainingSeats = (ticketType, change) => {
    setPriceInfor((prevPriceInfor) => {
      const updatedInfor = { ...prevPriceInfor };
      updatedInfor[key][ticketType].remaining += change;
      return updatedInfor;
    });
  };

  const startTimer = (seat, setTimer, setIntervalIds) => {
    clearInterval(intervalIds8AM[seat]);
    setTimer((prev) => ({
      ...prev,
      [seat]: 1000,
    }));
    const id = setInterval(() => {
      setTimer((prev) => {
        const newTime = prev[seat] - 1;
        if (newTime <= 0) {
          clearInterval(id);
          unselectSeat(
            seat,
            setSelectedSeats8AM,
            setTimer8AM,
            setIntervalIds8AM,
            selectedSeats8AM
          );
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

  const unselectSeat = (
    seat,
    setSelectedSeats,
    setTimer,
    setIntervalIds,
    selectedSeats
  ) => {
    const ticketType = selectedSeats[seat];
    setSelectedSeats((prev) => {
      const { [seat]: _, ...rest } = prev;
      return rest;
    });
    clearInterval(intervalIds8AM[seat]);
    clearInterval(intervalIds12AM[seat]);
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

  const remainingTickets = 10 - currentPriceInfor.special.remaining + 78 - currentPriceInfor.regular.remaining;



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
                        selectedSeats={selectedSeats8AM}
                        handleSeatSelection={(seat, ticketType) =>
                          handleSeatSelection(
                            seat,
                            ticketType,
                            setSelectedSeats8AM,
                            setTimer8AM,
                            setIntervalIds8AM
                          )
                        }
                        unselectSeat={(seat) =>
                          unselectSeat(
                            seat,
                            setSelectedSeats8AM,
                            setTimer8AM,
                            setIntervalIds8AM,
                            selectedSeats8AM
                          )
                        }
                        timer={timer8AM}
                      />
                    </Tab>
                    <Tab
                      className={key === "12:00" ? "active" : ""}
                      eventKey="12:00"
                      title="12:00"
                    >
                      <Trip12AM
                        selectedSeats={selectedSeats12AM}
                        handleSeatSelection={(seat, ticketType) =>
                          handleSeatSelection(
                            seat,
                            ticketType,
                            setSelectedSeats12AM,
                            setTimer12AM,
                            setIntervalIds12AM
                          )
                        }
                        unselectSeat={(seat) =>
                          unselectSeat(
                            seat,
                            setSelectedSeats12AM,
                            setTimer12AM,
                            setIntervalIds12AM,
                            selectedSeats12AM
                          )
                        }
                        timer={timer12AM}
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
                    {Object.keys(selectedSeats8AM).length > 0 && (
                      <>
                        <div className="wrap-nav-tab">
                          <h4>Ghế đang giữ</h4>
                          {Object.keys(selectedSeats8AM).map((seat) => (
                            <div className="item" key={seat}>
                              <div className="seat-item">Ghế {seat}</div>
                              <div className="time-item">{timer8AM[seat]}</div>
                              <div>
                                <i
                                  className="bi bi-trash"
                                  onClick={() =>
                                    unselectSeat(
                                      seat,
                                      setSelectedSeats8AM,
                                      setTimer8AM,
                                      setIntervalIds8AM,
                                      selectedSeats8AM
                                    )
                                  }
                                ></i>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    {Object.keys(selectedSeats12AM).length > 0 && (
                      <>
                        <div className="wrap-nav-tab">
                          <h4>Ghế đang giữ</h4>
                          {Object.keys(selectedSeats12AM).map((seat) => (
                            <div className="item" key={seat}>
                              <div className="seat-item">Ghế {seat}</div>
                              <div className="time-item">{timer12AM[seat]}</div>
                              <div>
                                <i
                                  className="bi bi-trash"
                                  onClick={() =>
                                    unselectSeat(
                                      seat,
                                      setSelectedSeats12AM,
                                      setTimer12AM,
                                      setIntervalIds12AM,
                                      selectedSeats12AM
                                    )
                                  }
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
                        <div className="price">
                          {currentPriceInfor.special.quantity}
                        </div>
                      </div>
                      <div className="item">
                        <div className="name">Còn lại:</div>
                        <div className="price">
                          {currentPriceInfor.special.remaining}
                        </div>
                      </div>
                      <div className="item">
                        <div className="name">Giá vé (người lớn):</div>
                        <div className="price">
                          {currentPriceInfor.special.adultPrice.toLocaleString()}{" "}
                          VND
                        </div>
                      </div>
                      <div className="item">
                        <div className="name">Giá vé (trẻ em):</div>
                        <div className="price">
                          {currentPriceInfor.special.childPrice.toLocaleString()}{" "}
                          VND
                        </div>
                      </div>
                    </div>

                    <div className="prices">
                      <h4>Vé thường</h4>
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
                        <div className="name">Giá vé (người lớn):</div>
                        <div className="price">
                          {currentPriceInfor.regular.adultPrice.toLocaleString()}{" "}
                          VND
                        </div>
                      </div>
                      <div className="item">
                        <div className="name">Giá vé (trẻ em):</div>
                        <div className="price">
                          {currentPriceInfor.regular.childPrice.toLocaleString()}{" "}
                          VND
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-btm text-center mbot-50 mtop-20">
            <Link to="/passengers" state={{remainingTickets}}>
              <button type="submit">
                <span>Tiếp tục</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
