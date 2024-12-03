import React, { useState, useEffect } from "react";
import "../trip8am/trip8AM.css";
import selecting_seat from "../../assets/selecting-seat.png";
import saleoff_seat from "../../assets/saleoff-seat.png";
import reserved_seat from "../../assets/reserved-seat.png";
import empty_seat from "../../assets/empty-seat.png";

function Trip8AM({ handleSeatSelection, timer, updatedSeats, selectedSeats,  unselectSeat  }) {
  const [activeSeat, setActiveSeat] = useState(null);


  const togglePopup = (seat) => {
    if (activeSeat === seat) {
      setActiveSeat(null); // Deselect if clicking on the same seat
    } else {
      setActiveSeat(seat); // Select a new seat
    }
  };

  const handlePopupClick = (event) => {
    event.stopPropagation(); // Prevent event propagation when clicking inside the popup
  };

  const handleRadioChange8AM = (seat, ticketType) => {
    handleSeatSelection(seat, ticketType);
    setActiveSeat(null);
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

  return (
    <div className="trip8AM">
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
                            selectedSeats[seat]
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
                        >
                          <span>{seat}</span>
                          {activeSeat === seat && (
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
                                      checked={
                                        selectedSeats[seat] === "special"
                                      }
                                      onChange={() =>
                                        handleRadioChange8AM(seat, "special")
                                      }
                                    ></input>
                                  </div>
                                  <div className="text">
                                    <span>
                                      Vé đặc biệt đặt trước 1 ngày (Áp dụng vé
                                      người lớn)
                                    </span>
                                    <p>Giá vé (người lớn): 260.000 VND</p>
                                    <p className="note">
                                      Không được hoàn, đổi vé, không áp dụng
                                      thanh toán tại quầy.
                                    </p>
                                  </div>
                                </label>
                                <label>
                                  <div>
                                    <input
                                      type="radio"
                                      name={`ticket-${seat}`}
                                      value="regular"
                                      checked={
                                        selectedSeats[seat] === "regular"
                                      }
                                      onChange={() =>
                                        handleRadioChange8AM(seat, "regular")
                                      }
                                    ></input>
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

export default Trip8AM;
