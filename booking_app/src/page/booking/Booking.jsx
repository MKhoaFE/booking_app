import React, { useEffect, useState } from "react";
import "../booking/booking.css";
import "../../GlobalStyles/glbStyles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Stepbar from "../../components/StepBar/stepbar";
import BookingHeader from "../../components/Booking-header/bookingHeader";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Trip8AM from "../../components/trip8am/trip8AM";
import Trip12AM from "../../components/trip12am/trip12AM";
import { Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const initialPriceInfor = {
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
};

const Booking = () => {
  const [key, setKey] = useState("8:00");
  const [selectedSeats8AM, setSelectedSeats8AM] = useState(() => {
    const savedSeats = localStorage.getItem("selectedSeats8AM");
    return savedSeats ? JSON.parse(savedSeats) : {};
  });
  const [selectedSeats12AM, setSelectedSeats12AM] = useState(() => {
    const savedSeats = localStorage.getItem("selectedSeats12AM");
    return savedSeats ? JSON.parse(savedSeats) : {};
  });
  const [visibleTabs, setVisibleTabs] = useState({});
  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const travelData = JSON.parse(localStorage.getItem("travelData"));
    if (travelData?.time === "8:00") {
      setVisibleTabs({ show8AM: true, show12AM: false });
      setKey("8:00");
    } else if (travelData?.time === "12:00") {
      setVisibleTabs({ show8AM: false, show12AM: true });
      setKey("12:00");
    } else {
      // Hiển thị cả hai nếu không có dữ liệu
      setVisibleTabs({ show8AM: true, show12AM: true });
    }
  }, []);

  const [timer8AM, setTimer8AM] = useState({});
  const [timer12AM, setTimer12AM] = useState({});
  const [intervalIds8AM, setIntervalIds8AM] = useState({});
  const [intervalIds12AM, setIntervalIds12AM] = useState({});
  const [priceInfor, setPriceInfor] = useState(initialPriceInfor);

  useEffect(() => {
    // Lưu trạng thái component hiện tại vào localStorage khi key thay đổi
    const storageData = {
      currentTab: key,
    };
    localStorage.setItem("selectedTab", JSON.stringify(storageData));
  }, [key, selectedSeats8AM, selectedSeats12AM]);

  useEffect(() => {
    localStorage.setItem("selectedSeats8AM", JSON.stringify(selectedSeats8AM));
  }, [selectedSeats8AM]);
  useEffect(() => {
    localStorage.setItem(
      "selectedSeats12AM",
      JSON.stringify(selectedSeats12AM)
    );
  }, [selectedSeats12AM]);

  const [travelData, setTravelData] = useState({
    trip: "",
    date: "",
    time: "",
  });
  useEffect(() => {
    //Lấy dữ liệu từ localStorage
    const storedData = JSON.parse(localStorage.getItem("travelData"));
    if (storedData) {
      setTravelData(storedData);
    }
  }, []);

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

      // Kiểm tra tồn tại của key và ticketType trước khi cập nhật
      if (updatedInfor[key] && updatedInfor[key][ticketType]) {
        updatedInfor[key][ticketType].remaining += change;
      } else {
        console.warn(
          "Ticket type or key does not exist in priceInfor:",
          ticketType,
          key
        );
      }

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

    if (!ticketType) {
      console.warn("Ticket type is undefined for seat:", seat);
      return;
    }

    setSelectedSeats((prev) => {
      const updatedSeats = { ...prev };
      delete updatedSeats[seat];
      return updatedSeats;
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

    updateRemainingSeats(ticketType, 0.5); // Cập nhật lại số lượng vé khi hủy ghế
  };

  const resetTabState = () => {
    setPriceInfor(initialPriceInfor);
  };

  const remainingTickets =
    10 -
    currentPriceInfor.special.remaining +
    78 -
    currentPriceInfor.regular.remaining;

  const countSpecialTicket = 10 - currentPriceInfor.special.remaining;
  const countRegularTicket = 78 - currentPriceInfor.regular.remaining;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");

        // Kiểm tra nếu không có token
        if (!token) {
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }

        // Gọi API protected-data
        const response = await axios.get(
          "http://localhost:5000/api/protected-data",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Đính kèm token vào header
            },
          }
        );
      } catch (err) {
        console.error("Error fetching protected data:", err);
        setError("Failed to fetch booking data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    // Update `currentPriceInfor` based on selected seats
    const seats = key === "8:00" ? selectedSeats8AM : selectedSeats12AM;
    if (seats) {
      const newSpecialRemaining = currentPriceInfor.special.quantity - Object.keys(seats).filter(s => seats[s] === "special").length;
      const newRegularRemaining = currentPriceInfor.regular.quantity - Object.keys(seats).filter(s => seats[s] === "regular").length;

      setPriceInfor(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          special: {
            ...prev[key].special,
            remaining: newSpecialRemaining
          },
          regular: {
            ...prev[key].regular,
            remaining: newRegularRemaining
          }
        }
      }));
    }
  }, [selectedSeats8AM, selectedSeats12AM, key]);
  
  useEffect(() => {
    localStorage.setItem('selectedSeats8AM', JSON.stringify(selectedSeats8AM));
    localStorage.setItem('selectedSeats12AM', JSON.stringify(selectedSeats12AM));
  }, [selectedSeats8AM, selectedSeats12AM]);


  return (
    <>
      <BookingHeader />
      <Stepbar />
      <div className="segment-container container">
        <div className="row">
          <div className="col-md-9">
            <div className="container">
              <div className="segment-info">
                {travelData ? (
                  <div>
                    Đặt vé từ{" "}
                    <span className="place-name" style={{ color: "green" }}>
                      {travelData.trip}
                    </span>{" "}
                    / Ngày {""}
                    {travelData.date}
                  </div>
                ) : (
                  <Typography variant="body1">Không có dữ liệu.</Typography>
                )}

                <div className="detail-wrap">
                  <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3 special mt-4 nav-tabs"
                    activeKey={key}
                    onSelect={(k) => {
                      setKey(k);
                      resetTabState();
                    }}
                  >
                    {visibleTabs.show8AM && (
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
                          updateRemainingSeats={updateRemainingSeats}
                          timer={timer8AM}
                        />
                      </Tab>
                    )}
                    {visibleTabs.show12AM && (
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
                    )}
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
            <Link
              to="/booking/passengers"
              state={{
                remainingTickets,
                countSpecialTicket,
                countRegularTicket,
              }}
            >
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
