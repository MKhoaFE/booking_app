import React, { useEffect, useState } from "react";
import "../booking/booking.css";
import "../../GlobalStyles/glbStyles.css";
import { Link, useNavigate } from "react-router-dom";
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

const Booking = () => {
  const [key, setKey] = useState("");
  const [selectedSeats, setSelectedSeats] = useState({});
  const [visibleTabs, setVisibleTabs] = useState({});
  const [timer, setTimer] = useState({});
  const [intervalIds, setIntervalIds] = useState({});
  const [priceInfor, setPriceInfor] = useState({});
  const [travelData, setTravelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("travelData"));
    if (storedData) {
      setTravelData(storedData);
      fetchJourneyData(storedData.journeyId);
    } else {
      setError("Không tìm thấy dữ liệu hành trình. Vui lòng quay lại trang chủ.");
      setLoading(false);
    }
  }, []);

  const fetchJourneyData = async (journeyId) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        setError("Vui lòng đăng nhập để tiếp tục.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/trainSchedule/getJourneyById/${journeyId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const journey = response.data.journey;
      if (!journey) {
        throw new Error("Không tìm thấy hành trình.");
      }

      // Lấy selectedSeats từ localStorage
      const storedSeats = JSON.parse(localStorage.getItem(`selectedSeats_${journey.departureTime}`)) || {};

      // Tính số ghế đã chọn từ storedSeats
      const specialSelected = Object.values(storedSeats).filter(type => type === "special").length;
      const regularSelected = Object.values(storedSeats).filter(type => type === "regular").length;

      // Cấu trúc priceInfor, trừ đi số ghế đã chọn
      const newPriceInfor = {
        [journey.departureTime]: {
          special: {
            capacity: journey.specialSeats,
            remaining: journey.specialSeats - (journey.specialTicketBooked || 0) - specialSelected,
            regularTicketPrice: journey.specialTicketPrice,
            specialTicketPrice: journey.specialTicketPrice,
          },
          regular: {
            capacity: journey.regularSeats,
            remaining: journey.regularSeats - (journey.regularTicketBooked || 0) - regularSelected,
            regularTicketPrice: journey.regularTicketPrice,
            specialTicketPrice: journey.regularTicketPrice,
          },
        },
      };

      setPriceInfor(newPriceInfor);
      setKey(journey.departureTime);
      setVisibleTabs({ [journey.departureTime]: true });
      setSelectedSeats(storedSeats);
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu hành trình:", err);
      setError("Không thể tải dữ liệu hành trình. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (key) {
      localStorage.setItem(`selectedSeats_${key}`, JSON.stringify(selectedSeats));
    }
  }, [selectedSeats, key]);

  const handleSeatSelection = (seat, ticketType) => {
    setSelectedSeats((prev) => ({
      ...prev,
      [seat]: ticketType,
    }));
    startTimer(seat);
    updateRemainingSeats(ticketType, -1);
  };

  const updateRemainingSeats = (ticketType, change) => {
    setPriceInfor((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [ticketType]: {
          ...prev[key][ticketType],
          remaining: prev[key][ticketType].remaining + change,
        },
      },
    }));
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
    if (!ticketType) return;

    setSelectedSeats((prev) => {
      const updatedSeats = { ...prev };
      delete updatedSeats[seat];
      return updatedSeats;
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
    updateRemainingSeats(ticketType, 1);
  };

  const currentPriceInfor = priceInfor[key] || {};
  const remainingTickets =
    (currentPriceInfor.special?.capacity || 0) -
    (currentPriceInfor.special?.remaining || 0) +
    (currentPriceInfor.regular?.capacity || 0) -
    (currentPriceInfor.regular?.remaining || 0);
  const countSpecialTicket =
    (currentPriceInfor.special?.capacity || 0) -
    (currentPriceInfor.special?.remaining || 0);
  const countRegularTicket =
    (currentPriceInfor.regular?.capacity || 0) -
    (currentPriceInfor.regular?.remaining || 0);

  if (loading) {
    return <Typography>Đang tải dữ liệu...</Typography>;
  }
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

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
                      {travelData.departureStation}
                    </span>{" "}
                    / Ngày {travelData.date}
                  </div>
                ) : (
                  <Typography variant="body1">Không có dữ liệu.</Typography>
                )}

                <div className="detail-wrap">
                  <Tabs
                    id="uncontrolled-tab-example"
                    className="mb-3 special mt-4 nav-tabs"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                  >
                    {Object.keys(visibleTabs).map((time) => (
                      <Tab key={time} eventKey={time} title={time}>
                        {time === "8:00" ? (
                          <Trip8AM
                            selectedSeats={selectedSeats}
                            handleSeatSelection={handleSeatSelection}
                            unselectSeat={unselectSeat}
                            timer={timer}
                          />
                        ) : (
                          <Trip12AM
                            selectedSeats={selectedSeats}
                            handleSeatSelection={handleSeatSelection}
                            unselectSeat={unselectSeat}
                            timer={timer}
                          />
                        )}
                      </Tab>
                    ))}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="book-sidebar">
              <div className="price-info">
                <div className="title">CHIỀU ĐI</div>
                <div className="content">
                  {Object.keys(selectedSeats).length > 0 && (
                    <div className="wrap-nav-tab">
                      <h4>Ghế đang giữ</h4>
                      {Object.keys(selectedSeats).map((seat) => (
                        <div
                          className="item"
                          style={{ display: "flex", justifyContent: "space-between" }}
                          key={seat}
                        >
                          <div className="seat-item">Ghế {seat}</div>
                          <div className="time-item" style={{ color: "green" }}>
                            {timer[seat]}
                          </div>
                          <div>
                            <i
                              className="bi bi-trash"
                              style={{ color: "red" }}
                              onClick={() => unselectSeat(seat)}
                            ></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="tab-content roboto-regular">
                    <div className="prices">
                      <h4>Vé đặc biệt</h4>
                      <div className="item">
                        <div className="name">Số lượng:</div>
                        <div className="price">{currentPriceInfor.special?.capacity || 0}</div>
                      </div>
                      <div className="item">
                        <div className="name">Còn lại:</div>
                        <div className="price">{currentPriceInfor.special?.remaining || 0}</div>
                      </div>
                      <div className="item">
                        <div className="name">Giá vé (người lớn):</div>
                        <div className="price">
                          {currentPriceInfor.special?.regularTicketPrice?.toLocaleString() || 0} VND
                        </div>
                      </div>
                      <div className="item">
                        <div className="name">Giá vé (trẻ em):</div>
                        <div className="price">
                          {currentPriceInfor.special?.specialTicketPrice?.toLocaleString() || 0} VND
                        </div>
                      </div>
                    </div>

                    <div className="prices">
                      <h4>Vé thường</h4>
                      <div className="item">
                        <div className="name">Số lượng:</div>
                        <div className="price">{currentPriceInfor.regular?.capacity || 0}</div>
                      </div>
                      <div className="item">
                        <div className="name">Còn lại:</div>
                        <div className="price">{currentPriceInfor.regular?.remaining || 0}</div>
                      </div>
                      <div className="item">
                        <div className="name">Giá vé (người lớn):</div>
                        <div className="price">
                          {currentPriceInfor.regular?.regularTicketPrice?.toLocaleString() || 0} VND
                        </div>
                      </div>
                      <div className="item">
                        <div className="name">Giá vé (trẻ em):</div>
                        <div className="price">
                          {currentPriceInfor.regular?.specialTicketPrice?.toLocaleString() || 0} VND
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
              state={{ remainingTickets, countSpecialTicket, countRegularTicket }}
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