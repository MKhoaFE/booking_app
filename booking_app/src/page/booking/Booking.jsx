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
import { Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import TripSelector from "../../components/trip8am/TripSelector";

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
  const [reservedSeats, setReservedSeats] = useState([]);

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
      const response = await axios.get(
        `http://localhost:5000/api/trainSchedule/getJourneyById/${journeyId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const journey = response.data.journey;
  
      const storedSeats = JSON.parse(localStorage.getItem(`selectedSeats_${journey.departureTime}`)) || {};
      const specialSelected = Object.values(storedSeats).filter(type => type === "special").length;
      const regularSelected = Object.values(storedSeats).filter(type => type === "regular").length;
  
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
      setReservedSeats(journey.reservedSeats || []); // Thêm reservedSeats từ server
    } catch (err) {
      setError("Không thể tải dữ liệu hành trình.");
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
      <TripSelector
        departureTime={time}
        seats={[
          ["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "J8", "K8", "L8"],
          ["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "J7", "K7", "L7"],
          ["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "J6", "K6", "L6"],
          ["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "J5", "K5", "L5"],
          [],
          ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "J4", "K4", "L4"],
          ["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "J3", "K3", "L3"],
          ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "J2", "K2", "L2"],
          ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "J1", "K1", "L1"],
        ]} // Tạm thời hardcode, sau này lấy từ server
        selectedSeats={selectedSeats}
        handleSeatSelection={handleSeatSelection}
        unselectSeat={unselectSeat}
        timer={timer}
        reservedSeats={reservedSeats} // Truyền danh sách ghế đã đặt
      />
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