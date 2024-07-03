import React from 'react'
import BookingHeader from '../../components/Booking-header/bookingHeader';
import Stepbar from '../../components/StepBar/stepbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
function Passengers() {
  return (
    <>
        <BookingHeader></BookingHeader>
        <Stepbar></Stepbar>
        <div className="container">
          <div className="passenger-infor">
            <div className="line"></div>
            <div className="wrapper">
              <div className="ticket-table">
            
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
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

              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Passengers;