import React, { useEffect, useState } from "react";
import BookingHeader from "../../components/Booking-header/bookingHeader";
import Stepbar from "../../components/StepBar/stepbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Table } from "react-bootstrap";
import "../passengers/passenger.css";
import { Link, useLocation } from "react-router-dom";
import "../../GlobalStyles/glbStyles.css";
function Passengers() {
  const location = useLocation();
  const { remainingTickets } = location.state || {};
  const { countSpecialTicket } = location.state || {};
  const { countRegularTicket } = location.state || {};
  const [selectedTab, setSelectedTab] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState({});
  useEffect(() => {
    const seats = localStorage.getItem("selectedSeat8AM");
    if (seats) {
      setSelectedSeats(JSON.parse(seats));
    }
  }, []);
  useEffect(() => {
    const tab = localStorage.getItem("selectedTab");
    if (tab) {
      setSelectedTab(JSON.parse(tab));
    }
  }, []);

  console.log("vé thường: ", countRegularTicket);
  console.log("vé đặc biệt: ", countSpecialTicket);
  return (
    <>
      <BookingHeader></BookingHeader>
      <Stepbar></Stepbar>
      <div className="container">
        <div className="passenger-infor">
          <div className="line"></div>
          <div className="wrapper">
            <div className="ticket-table">
              <p>
                {selectedTab ? (
                  <strong>
                    Chuyến hiện tại:{" "}
                    <span
                      style={{
                        color: "green",
                        fontSize: "2rem",
                        fontStyle: "italic",
                      }}
                    >
                      {selectedTab.currentTab}
                    </span>{" "}
                  </strong>
                ) : (
                  <strong>Không có tab nào được chọn.</strong>
                )}
              </p>
              <p>
                {" "}
                {Object.keys(selectedSeats).length > 0 ? (
                  <ul>
                    {Object.entries(selectedSeats).map(([seat, type]) => (
                      <li key={seat}>
                        Ghế: {seat} - Loại: {type}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Không có ghế nào được chọn.</p>
                )}
              </p>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th width="35%" style={{ minWidth: "220px" }}>
                      Thông tin hành khách
                    </th>
                    <th width="30%" style={{ minWidth: "220px" }}>
                      Thông tin chỗ
                    </th>
                    <th width="10%" style={{ minWidth: "100px" }}>
                      Đối tượng
                    </th>
                    <th width="10%" style={{ minWidth: "100px" }}>
                      Giá vé
                    </th>
                    <th width="10%" style={{ minWidth: "100px" }}>
                      Tổng tiền
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array(countRegularTicket)
                    .fill()
                    .map((_, index) => (
                      <tr key={index}>
                        <td>
                          <div className="field-item">
                            <div className="col-md-4">
                              <label>Họ và tên (*)</label>
                            </div>
                            <div className="col-md-8">
                              <input type="text" />
                            </div>
                          </div>
                          <div className="field-item">
                            <div className="col-md-4">
                              <label>Số điện thoại</label>
                            </div>
                            <div className="col-md-8">
                              <input type="text" />
                            </div>
                          </div>
                          <div className="field-item">
                            <div className="col-md-4">
                              <label>CMND</label>
                            </div>
                            <div className="col-md-8">
                              <input type="text" />
                            </div>
                          </div>
                          <div className="field-item">
                            <div className="col-md-4">
                              <label>Quốc gia</label>
                            </div>
                            <div className="col-md-8">
                              <input type="text" />
                            </div>
                          </div>
                          <div className="col-md-12 field-item">
                            <div className="col-md-6">
                              <div className="field-item">
                                <label>Giới tính</label>
                                <select>
                                  <option value="1">Nam</option>
                                  <option value="2">Nữ</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="field-item">
                                <label>Năm sinh</label>
                                <select>
                                  <option value="1">1990</option>
                                  <option value="2">1991</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="trip-infor">
                          <div className="wrap">
                            <span>
                              <div>Giữ chỗ trong giây</div>
                              <div>Chặng: TP. Hồ Chí Minh - Vũng Tàu</div>
                              <div>Ngày giờ: 09/07/2024 10:00</div>
                              <div>Ghế: H3</div>
                              <div>
                                Loại vé: <b>Thường</b>{" "}
                              </div>
                            </span>
                          </div>
                        </td>
                        <td>
                          <div style={{ marginTop: "5rem" }}></div>
                        </td>
                        <td>
                          <div style={{ marginTop: "5rem" }}>320.000 VND</div>
                        </td>
                        <td>
                          <div style={{ marginTop: "5rem" }}>320.000 VND</div>
                        </td>
                      </tr>
                    ))}
                  {Array(countSpecialTicket)
                    .fill()
                    .map((_, index) => (
                      <tr key={index}>
                        <td>
                          <div className="field-item">
                            <div className="col-md-4">
                              <label>Họ và tên (*)</label>
                            </div>
                            <div className="col-md-8">
                              <input type="text" />
                            </div>
                          </div>
                          <div className="field-item">
                            <div className="col-md-4">
                              <label>Số điện thoại</label>
                            </div>
                            <div className="col-md-8">
                              <input type="text" />
                            </div>
                          </div>
                          <div className="field-item">
                            <div className="col-md-4">
                              <label>CMND</label>
                            </div>
                            <div className="col-md-8">
                              <input type="text" />
                            </div>
                          </div>
                          <div className="field-item">
                            <div className="col-md-4">
                              <label>Quốc gia</label>
                            </div>
                            <div className="col-md-8">
                              <input type="text" />
                            </div>
                          </div>
                          <div className="col-md-12 field-item">
                            <div className="col-md-6">
                              <div className="field-item">
                                <label>Giới tính</label>
                                <select>
                                  <option value="1">Nam</option>
                                  <option value="2">Nữ</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="field-item">
                                <label>Năm sinh</label>
                                <select>
                                  <option value="1">1990</option>
                                  <option value="2">1991</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="trip-infor">
                          <div className="wrap">
                            <span>
                              <div>Giữ chỗ trong giây</div>
                              <div>Chặng: TP. Hồ Chí Minh - Vũng Tàu</div>
                              <div>Ngày giờ: 09/07/2024 10:00</div>
                              <div>Ghế: H3</div>
                              <div>
                                Loại vé:<b> Đặc biệt</b>
                              </div>
                            </span>
                          </div>
                        </td>
                        <td>
                          <div style={{ marginTop: "5rem" }}></div>
                        </td>
                        <td>
                          <div style={{ marginTop: "5rem" }}>260.000 VND</div>
                        </td>
                        <td>
                          <div style={{ marginTop: "5rem" }}>260.000 VND</div>
                        </td>
                      </tr>
                    ))}

                  <tr>
                    <td className="total" colSpan={5}>
                      <h3>
                        TỔNG TIỀN :{" "}
                        {(
                          countRegularTicket * 320000 +
                          countSpecialTicket * 260000
                        ).toLocaleString("vi-VN")}{" "}
                        VND
                      </h3>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className="line"></div>
          <div className="contact-infor">
            <h2>thông tin liên hệ</h2>
            <div className="col-md-12 col-sm-12 col-xs-12 no-padding">
              <div className="col-md-5 col-sm-5 col-xs-12">
                <div className="field-item">
                  <div className="col-md-4">Họ và tên (*)</div>
                  <div className="col-md-8">
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-sm-5 col-xs-12">
                <div className="field-item">
                  <div className="col-md-4">Số điện thoại (*)</div>
                  <div className="col-md-8">
                    <input type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-sm-12 col-xs-12 no-padding">
              <div className="col-md-5 col-sm-5 col-xs-12">
                <div className="field-item">
                  <div className="col-md-4">Địa chỉ (*)</div>
                  <div className="col-md-8">
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-sm-5 col-xs-12">
                <div className="field-item">
                  <div className="col-md-4">Email (*)</div>
                  <div className="col-md-8">
                    <input type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-sm-12 col-xs-12 no-padding">
              <div className="col-md-5 col-sm-5 col-xs-12">
                <div className="field-item">
                  <div className="col-md-4">Công ty</div>
                  <div className="col-md-8">
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-sm-5 col-xs-12">
                <div className="field-item">
                  <div className="col-md-4">Mã số thuế</div>
                  <div className="col-md-8">
                    <input type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 checkbox">
            <label>
              <input type="checkbox" />
              <span>Tôi đã đọc và đồng ý điều khoản bên dưới</span>
            </label>
            <div className="box">
              <p>
                Điều khoản này là sự thoả thuận đồng ý của quý khách khi sử dụng
                dịch vụ thanh toán trên trang web greenlines-dp.com của Công ty
                GreenlinesDP và những trang web của bên thứ ba. Việc quý khách
                đánh dấu vào ô “Đồng ý” và nhấp chuột vào thanh “Chấp nhận”
                nghĩa là quý khách đồng ý tất cả các điều khoản thỏa thuận trong
                các trang web này.
              </p>
              <br />
              <p>
                <strong>Giải thích từ ngữ</strong>
              </p>

              <p>&nbsp;</p>
              <p>
                Điều khoản: là những điều quy định giữa Công ty GreenlinesDP và
                quý khách
              </p>
              <p>
                Bên thứ ba: là những đơn vị liên kết với Công ty GreenlinesDP
                (OnePay, Agribank) nhằm hỗ trợ việc thanh toán qua mạng cho quý
                khách
              </p>
              <p>
                Vé điện tử: là những thông tin và hành trình của quý khách cho
                chuyến đi được thể hiện trên một trang giấy mà quý khách có thể
                in ra được
              </p>
              <p>
                <strong>Về sở hữu bản quyền</strong>
              </p>
              <p>
                Trang web greenlines-dp.com thuộc quyền sở hữu của Công ty
                GreenlinesDP và được bảo vệ theo luật bản quyền, quý khách chỉ
                được sử dụng trang web này với mục đích xem thông tin và đăng ký
                thanh toán online cho cá nhân chứ không được sử dụng cho bất cứ
                mục đích thương mại nào khác.
              </p>
              <p>
                Việc lấy nội dung để tham khảo, làm tài liệu cho nghiên cứu phải
                ghi rõ ràng nguồn lấy từ nội dung trang web Công ty
                GreenlinesDP. Không được sử dụng các logo, các nhãn hiệu Công ty
                GreenlinesDP dưới mọi hình thức nếu chưa có sự đồng ý của Công
                ty GreenlinesDP bằng văn bản.
              </p>
              <p>
                <strong>Về thông tin khách hàng</strong>
              </p>
              <p>
                Khi đăng ký thanh toán qua mạng, quý khách sẽ được yêu cầu cung
                cấp một số thông tin cá nhân và thông tin tài khoản.
              </p>
              <p>
                Đối với thông tin cá nhân: Những thông tin này chỉ để phục vụ
                cho nhu cầu xác nhận sự mua dịch vụ của quý khách và sẽ hiển thị
                những nội dung cần thiết trên vé điện tử. Công ty GreenlinesDP
                cũng sẽ sử dụng những thông tin liên lạc này để gửi đến quý
                khách những sự kiện, những tin tức khuyến mãi và những ưu đãi
                đặc biệt nếu quý khách đồng ý. Những thông tin này của quý khách
                sẽ được Công ty GreenlinesDP bảo mật và không tiết lộ cho bên
                thứ ba biết ngoại trừ sự đồng ý của quý khách hoặc là phải tiết
                lộ theo sự tuân thủ luật pháp quy định.
              </p>
              <p>
                Đối với thông tin tài khoản: Những thông tin này sẽ được Công ty
                GreenlinesDP và bên thứ ba áp dụng những biện pháp bảo mật cao
                nhất do các hệ thống thanh toán nổi tiếng trên thế giới như Visa
                và MasterCard cung cấp nhằm đảm bảo sự an toàn tuyệt đối của
                thông tin tài khoản quý khách.
              </p>
              <p>
                <strong>Về trang web liên kết</strong>
              </p>
              <p>
                Các trang web của Công ty GreenlinesDP có chứa những liên hệ kết
                nối với trang web của bên thứ ba. Việc liên kết trang web của
                bên thứ ba này nhằm chỉ cung cấp những sự tiện lợi cho quý khách
                chứ không phải là sự tán thành, chấp nhận những nội dung, thông
                tin sản phẩm của những trang web bên thứ ba. Công ty
                GreenlinesDP sẽ không chiu trách nhiệm về bất cứ trách nhiệm
                pháp lý nào liên quan đến những thông tin gì trong các trang web
                bên thứ ba.
              </p>
              <p>
                <strong>Về hủy tour</strong>
              </p>
              <p>
                Trong trường hợp hủy tour, quý khách vui lòng gửi email thông
                báo hủy tour đến Công ty GreenlinesDP. Công ty GreenlinesDP sẽ
                trao đổi và xác nhận lại tất cả các thông tin của quý khách. Khi
                hoàn tất việc xác nhận thông tin, Công ty GreenlinesDP sẽ hoàn
                tiền vào đúng tài khoản quý khách đã thanh toán sau khi trừ các
                khoản lệ phí hủy tour. Lệ phí hủy tour sẽ tùy thuộc vào từng
                tour tuyến quý khách đăng ký.
              </p>
              <p>
                <strong>Trách nhiệm của GreenlinesDP</strong>
              </p>
              <p>
                Công ty GreenlinesDP có nhiệm vụ bảo mật và lưu trữ an toàn các
                thông tin của quý khách với sự nghiêm túc cao nhất.
              </p>
              <p>
                Giải quyết những thắc mắc, sai sót, vi phạm mà quý khách gặp
                phải trong quá trình thanh toán nếu do lỗi của Công ty
                GreenlinesDP.
              </p>
              <p>
                Đảm bảo thực hiện đầy đủ mọi dịch vụ theo đúng chương trình mà
                quý khách đăng ký. Tuy nhiên chúng tôi có toàn quyền thay đổi lộ
                trình hoặc hủy bỏ chuyến đi du lịch bất cứ lúc nào mà chúng tôi
                thấy cần thiết vì sự an toàn cho quý khách.
              </p>
              <p>
                Mọi thay đổi nếu có sẽ được thông báo nhanh chóng cho quý khách
                ngay trước ngày khởi hành hoặc ngay sau khi phát hiện những phát
                sinh.
              </p>
              <p>
                <strong>
                  Trường hợp miễm trách nhiệm đối với GreenlinesDP
                </strong>
              </p>
              <p>
                Công ty GreenlinesDP không chịu trách nhiệm về tất cả những
                thông tin mà quý khách cung cấp bởi chúng tôi không dễ dàng xác
                nhận chính xác quý khách nào đăng ký thông tin.
              </p>
              <p>
                Công ty GreenlinesDP không chịu trách nhiệm về việc thông tin
                của quý khách bị lấy cắp nếu như việc lấy cắp được thực hiện từ
                máy của quý khách do bị nhiễm virus máy tính hay do nguyên nhân
                nào khác.
              </p>
              <p>
                Công ty GreenlinesDP không chịu trách nhiệm đối với quý khách
                nếu xảy ra việc hệ thống máy tính của quý khách bị hư hại trong
                khi đang thanh toán hoặc bị can thiệp liên quan tới việc sử dụng
                một trang bên ngoài.
              </p>
              <p>
                Công ty GreenlinesDP không chịu trách nhiệm về việc mất dữ liệu
                thông tin của quý khách do sự cố khách quan như: thiên tai hạn
                hán, hỏa hoạn, chiến tranh…
              </p>
              <p>Trách nhiệm của khách hàng</p>
              <p>
                Quý khách cam kết hoàn toàn chịu trách nhiệm về các thông tin cá
                nhân, thông tin thẻ tín dụng đã được khai báo là trung thực,
                chính xác. Nếu có sai sót, giả mạo hay tranh chấp phát sinh thì
                Công ty GreenlinesDP có quyền hủy tour đã mua của quý khách.
              </p>
              <p>
                Quý khách có nhiệm vụ kiểm tra thông tin tài khoản để kịp thời
                để báo cho Công ty GreenlinesDP nếu có những sự cố. Thời hạn
                trong vòng 30 ngày tính từ ngày thanh toán, Công ty GreenlinesDP
                sẽ không nhận giải quyết bất cứ kiếu nại nào từ việc thanh toán.
              </p>

              <p>
                Quý khách không sử dụng các nội dung của trang web do Công ty
                GreenlinesDP quản lý cho mục đích thương mại nếu như chưa có sự
                đồng ý.
              </p>
              <p>
                Quý khách cần tự áp dụng cài đặt các biện pháp phòng ngừa để bảo
                đảm rằng bất cứ lựa chọn nào của quý khách khi sử dụng các trang
                web của Công ty GreenlinesDP không bị virus hoặc bất cứ mối đe
                dọa nào khác từ ngoài có thể can thiệp hoặc gây hư hại cho hệ
                thống máy tính của quý khách.
              </p>
              <p>
                <strong>QUY ĐỊNH ĐỔI TRẢ VÉ TÀU DÀNH CHO HÀNH KHÁCH</strong>
              </p>
              <ol style={{ marginLeft: "40px" }}>
                <li>
                  <p>
                    Quí khách sau khi đã mua vé, nếu muốn thay đổi ngày giờ xin
                    vui lòng liên hệ phòng vé và phải báo trước giờ khởi hành in
                    trên vé ít nhất 1 tiếng để được đổi 1 lần miễn phí, thay đổi
                    ngày, giờ lần thứ hai chịu phí 50% giá vé.
                  </p>
                </li>
                <li>
                  <p>
                    Trước giờ khởi hành, Quí khách muốn hoàn trả vé phải chịu
                    phí 60% giá vé.
                  </p>
                </li>
                <li>
                  <p>
                    Sau giờ khởi hành, Quí khách muốn đổi vé phải chịu phí 50%
                    giá vé
                  </p>
                </li>
                <li>
                  <p>Sau giờ khởi hành vé không được hoàn trả.</p>
                </li>
                <li>
                  <p>
                    GreenlinesDP được miễn trừ bồi thường khi phải hủy chuyến
                    Tàu hoặc chuyến Tàu bị kéo dài vì một trong các nguyên nhân:
                    Điều kiện thời tiết bất lợi, điều kiện thủy triều, thiên
                    tai, động đất, an toàn kỹ thuật, nguy cơ an ninh …
                  </p>
                </li>
              </ol>
              <p>
                <strong>
                  <i>Ghi chú: </i>
                </strong>
                Vé có giá trị sử dụng trong vòng 6 tháng kể từ ngày phát hành
                được in trên vé và khi muốn đổi, trả quí khách phải theo những
                qui định trên (yêu cầu Quí khách phải cung cấp được mã vé nếu vé
                bị mờ, rách)
              </p>
            </div>
          </div>
        </div>
        <div className="btn-btm text-center mbot-50 mtop-20">
          <Link to="/booking/payment">
            <button type="submit">
              <span>Tiếp tục</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Passengers;
