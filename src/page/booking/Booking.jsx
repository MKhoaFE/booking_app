import React from "react";
import "../booking/booking.css";
import "../../GlobalStyles/glbStyles.css";
import { Link } from "react-router-dom";
import selecting_seat from "../../assets/selecting-seat.png";
import saleoff_seat from "../../assets/saleoff-seat.png";
import reserved_seat from "../../assets/reserved-seat.png";
import empty_seat from "../../assets/empty-seat.png";


function Booking() {
  return (
    <>
      <div className="background-header"></div>
      <div className="booking-container">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="step-bar roboto-medium">
                <div className="item">Tìm kiếm</div>
                <div className="item active">Chọn chỗ ngồi</div>
                <div className="item">Thông tin hành khách</div>
                <div className="item">Thanh toán</div>
                <div className="item">Kết thúc</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="segment-container container">
        <div className="row">
          <div className="col-md-9">
            <div className=" container">
              <div className="segment-info">
                Đặt vé từ <span className="place-name">TP. HỒ CHÍ MINH</span>{" "}
                đến <span className="place-name">VŨNG TÀU</span> ngày 04/06/2024
                <div className="detail-wrap">
                  <div className="select-time">
                    <Link to="/">
                      <button className="active">8:00</button>
                    </Link>
                    <Link to="/booking">
                      <button>10:00</button>
                    </Link>
                    <Link to="/">
                      <button>12:00</button>
                    </Link>
                  </div>
                </div>
              </div>
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
                <div className="wrap">
                  <div className="bottom row">
                    <div className="ship-container roboto-medium">
                      <table style={{ marginTop: "48px", marginLeft: "80px" }}>
                        <tbody>
                          <tr>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>A8</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>B8</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>C8</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>D8</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>E8</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>F8</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>G8</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>H8</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>J8</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>K8</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>L8</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>A7</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>B7</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>C7</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>D7</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>E7</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>F7</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>G7</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>H7</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>J7</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>K7</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>L7</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>A6</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>B6</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>C6</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>D6</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>E6</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>F6</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>G6</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>H6</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>J6</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>K6</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>L6</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>A5</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>B5</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>C5</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>D5</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>E5</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>F5</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>G5</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>H5</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>J5</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>K5</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>L5</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                          </tr>
                          <tr>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>A4</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>B4</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>C4</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>D4</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>E4</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>F4</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>G4</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>H4</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>J4</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>K4</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>L4</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>A3</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>B3</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>C3</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>D3</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>E3</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>F3</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>G3</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>H3</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>J3</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>K3</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>L3</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>A2</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>B2</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>C2</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>D2</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>E2</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>F2</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>G2</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>H2</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>J2</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>K2</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>L2</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px"></td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>A1</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>B1</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>C1</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>D1</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>E1</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>F1</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>G1</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>H1</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>J1</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>K1</span>
                              </div>
                            </td>
                            <td width="37px" height="33px">
                              <div className="seat">
                                <span>L1</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="book-sidebar roboto-thin">
              <div className="price-info">
                <div className="direction"></div>
                <div className="title">CHIỀU ĐI</div>
                <div className="content">
                  <ul className="nav-tab">
                    <li className="nav-item"><a href="#">Thường</a></li>
                   
                  </ul>

                  <div className="tab-content">
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
                        <div className="price">10</div>
                      </div>
                      <div className="item">
                        <div className="name">Còn lại: </div>
                        <div className="price">10</div>
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
          </div>
        </div>
        <div className="text-center mbot-50 mtop-20">
          <button type="submit" className="continue-btn">
            <span>Tiếp tục</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Booking;
