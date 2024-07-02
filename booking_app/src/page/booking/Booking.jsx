import React, { useState } from "react";
import "../booking/booking.css";
import "../../GlobalStyles/glbStyles.css";
import { Link } from "react-router-dom";
import selecting_seat from "../../assets/selecting-seat.png";
import saleoff_seat from "../../assets/saleoff-seat.png";
import reserved_seat from "../../assets/reserved-seat.png";
import empty_seat from "../../assets/empty-seat.png";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Stepbar from "../../components/StepBar/stepbar";
import BookingHeader from "../../components/Booking-header/bookingHeader";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Trip8AM from "../../components/trip8am/trip8AM";
import Trip12AM from "../../components/trip12am/trip12AM";

function Booking() {
  const [activeSeat, setActiveSeat] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState({});
  const [timer, setTimer] = useState({});
  const [intervalIds, setIntervalIds] = useState({});

  const togglePopup = (seat) => {
    if (activeSeat === seat) {
      setActiveSeat(null); // Deselect if clicking on the same seat
    } else {
      setActiveSeat(seat); // Select a new seat
    }
  };

  const handlePopupClick = (event) => {
    event.stopPropagation(); //ngăn chặn lan truyền event khi click vào trong popup
  };

  const handleRadioChange = (seat, ticketType) => {
    setSelectedSeats((prev) => ({
      ...prev,
      [seat]: ticketType,
    }));
    setActiveSeat(null);
    startTimer(seat);
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
          unselectedSeat(seat);
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

  const unselectedSeat = (seat) => {
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
  };

  const seats = [
    ["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "J8", "K8", "L8"],
    ["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "J7", "K7", "L7"],
    ["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "J6", "K6", "L6"],
    ["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "J5", "K5", "L5"],
    [],
    ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "J4", "K4", "L4"],
    ["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "J3", "K3", "L3"],
    ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "J2", "K2", "L2"],
    ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "J1", "K1", "L1"],
  ];

  const countSlots = (seat) => {
    let totalSlots = 0;
    for (let row of seats) {
      totalSlots += row.length;
    }
    return totalSlots;
  };

  const getTotalSelectedSeats = () => {
    return Object.keys(selectedSeats).length;
  };
  const [key, setKey] = useState("8:00");
  return (
    <>
      <BookingHeader />
      <Stepbar></Stepbar>

      <div className="segment-container container">
        <div className="row">
          <div className="col-md-9">
            <div className="container">
              <div className="segment-info">
                Đặt vé từ <span className="place-name">TP. HỒ CHÍ MINH</span>{" "}
                đến <span className="place-name">VŨNG TÀU</span> ngày 04/06/2024
                <div className="detail-wrap">
                  {/* <div className="select-time">
                    <Link to="/">
                      <button className="active">8:00</button>
                    </Link>
                    <Link to="/">
                      <button>12:00</button>
                    </Link>
                  </div> */}

                  <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3 special"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                  >
                    
                    <Tab className={key === '8:00' ?"active": ""} eventKey="8:00" title="8:00">
                      <Trip8AM />
                    </Tab>
                    <Tab className={key === "12:00" ? "active" : ""} eventKey="12:00" title="12:00">
                      <Trip12AM />
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-md-3">
            <div className="book-sidebar ">
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
                              <div className="seat-item">Ghế {seat} </div>
                              <div className="time-item"> {timer[seat]}</div>
                              <div>
                                <i className="bi bi-trash"></i>
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
                        <div className="name">Số lượng: </div>
                        <div className="price">10</div>
                      </div>
                      <div className="item">
                        <div className="name">Còn lại: </div>
                        <div className="price">10</div>
                      </div>
                      <div className="item">
                        <div className="name">Người lớn: </div>
                        <div className="price">260.000 VND</div>
                      </div>
                      <div className="item">
                        <div className="name">Trẻ em: </div>
                        <div className="price">190.000 VND</div>
                      </div>
                    </div>
                    <div className="prices">
                      <h4>Vé Thường</h4>
                      <div className="item">
                        <div className="name">Số lượng: </div>
                        <div className="price">{countSlots(seats) - 10}</div>
                      </div>
                      <div className="item">
                        <div className="name">Còn lại: </div>
                        <div className="price">
                          {countSlots(seats) - 10 - getTotalSelectedSeats()}
                        </div>
                      </div>
                      <div className="item">
                        <div className="name">Người lớn: </div>
                        <div className="price">320.000 VND</div>
                      </div>
                      <div className="item">
                        <div className="name">Trẻ em: </div>
                        <div className="price">270.000 VND</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="btn-btm text-center mbot-50 mtop-20">
          <button type="submit">
            <Link to="/passengers">
              <span>Tiếp tục</span>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Booking;
