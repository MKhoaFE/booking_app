import React, { useState } from "react";
import "./trip8AM.css"; // Đổi tên file CSS cho chung
import selecting_seat from "../../assets/selecting-seat.png";
import saleoff_seat from "../../assets/saleoff-seat.png";
import reserved_seat from "../../assets/reserved-seat.png";
import empty_seat from "../../assets/empty-seat.png";

function TripSelector({
  departureTime, // Thời gian khởi hành (ví dụ: "8:00")
  seats, // Danh sách ghế từ server (hoặc hardcode tạm thời)
  selectedSeats,
  handleSeatSelection,
  unselectSeat,
  timer,
  reservedSeats = [], // Ghế đã đặt từ server (mặc định rỗng nếu chưa có)
}) {
  const [activeSeat, setActiveSeat] = useState(null);

  const togglePopup = (seat) => {
    if (reservedSeats.includes(seat)) return; // Không cho chọn ghế đã đặt
    if (activeSeat === seat) {
      setActiveSeat(null);
    } else {
      setActiveSeat(seat);
    }
  };

  const handlePopupClick = (event) => {
    event.stopPropagation();
  };

  const handleRadioChange = (seat, ticketType) => {
    handleSeatSelection(seat, ticketType);
    setActiveSeat(null);
  };

  return (
    <div className="trip-selector">
      <div className="line"></div>
      <div className="select-seat-container">
        <div className="top row">
          <div className="seat-info-item col-md-3 col-sm-3 col-xs-6 no-padding">
            <img src={empty_seat} alt="" /> Ghế trống
          </div>
          <div className="seat-info-item col-md-3 col-sm-3 col-xs-6 no-padding">
            <img src={reserved_seat} alt="" /> Ghế đã đặt
          </div>
          <div className="seat-info-item col-md-3 col-sm-3 col-xs-6 no-padding">
            <img src={selecting_seat} alt="" /> Ghế đang chọn
          </div>
          <div className="seat-info-item col-md-3 col-sm-3 col-xs-6 no-padding">
            <img src={saleoff_seat} alt="" /> Vé khuyến mãi
          </div>
        </div>

        <div className="bottom row">
          <div className="ship-container roboto-medium">
            <table style={{ marginTop: "48px", marginLeft: "80px" }}>
              <tbody>
                {seats.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array(7)
                      .fill(null)
                      .map((_, idx) => (
                        <td
                          width="37px"
                          height="33px"
                          key={`empty-${rowIndex}-${idx}`}
                        ></td>
                      ))}
                    {row.map((seat, seatIndex) => (
                      <td key={seatIndex} width="37px" height="33px">
                        <div
                          className={`seat ${
                            reservedSeats.includes(seat)
                              ? "reserved"
                              : selectedSeats[seat]
                              ? selectedSeats[seat] === "special"
                                ? "saleoff"
                                : "selecting"
                              : ""
                          }`}
                          onClick={() =>
                            selectedSeats[seat]
                              ? unselectSeat(seat)
                              : togglePopup(seat)
                          }
                          style={{
                            cursor: reservedSeats.includes(seat)
                              ? "not-allowed"
                              : "pointer",
                          }}
                        >
                          <span>{seat}</span>
                          {activeSeat === seat && !reservedSeats.includes(seat) && (
                            <div
                              className="popuptext show"
                              onClick={handlePopupClick}
                            >
                              <div className="infor">
                                <h4>Xin vui lòng chọn lớp vé (Thường)</h4>
                                <label>
                                  <div>
                                    <input
                                      type="radio"
                                      name={`ticket-${seat}`}
                                      value="special"
                                      checked={selectedSeats[seat] === "special"}
                                      onChange={() => handleRadioChange(seat, "special")}
                                    />
                                  </div>
                                  <div className="text">
                                    <span>Vé đặc biệt đặt trước 1 ngày</span>
                                    <p>Giá vé (người lớn): 260.000 VND</p>
                                    <p className="note">
                                      Không được hoàn, đổi vé, không áp dụng thanh toán tại quầy.
                                    </p>
                                  </div>
                                </label>
                                <label>
                                  <div>
                                    <input
                                      type="radio"
                                      name={`ticket-${seat}`}
                                      value="regular"
                                      checked={selectedSeats[seat] === "regular"}
                                      onChange={() => handleRadioChange(seat, "regular")}
                                    />
                                  </div>
                                  <div className="text">
                                    <span>Vé thường</span>
                                    <p>Giá vé (người lớn): 320.000 VND</p>
                                  </div>
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripSelector;