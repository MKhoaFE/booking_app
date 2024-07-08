import React, { useState } from "react";
import BookingHeader from "../../components/Booking-header/bookingHeader";
import Stepbar from "../../components/StepBar/stepbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Form, Table } from "react-bootstrap";
import "../passengers/passenger.css";

function Passengers() {
  const [result, setResult] = useState(null);
  const handleCalculate_R = (value) => {
    console.log("kq: ", value);
    setResult(value);
  };
  return (
    <>
      <BookingHeader></BookingHeader>
      <Stepbar></Stepbar>
      <div className="container">
        <div className="passenger-infor">
          <div className="line"></div>
          <div className="wrapper">
            <div className="ticket-table">
              <h1>{result !== null ? result : "Đang tính...."}</h1>
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
                  <tr>
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
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Passengers;
