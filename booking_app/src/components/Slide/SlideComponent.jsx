import MapComponent from "../../components/Map/MapComponent.jsx";
import React from "react";
import "../Slide/slide.css";
const SlideComponent = ({
  title,
  address,
  schedule,
  weekdays,
  weekends,
  duration,
}) => {
  return (
    <div className="slide container">
      <div className="content">
        <div className="col12 title">
          <span style={{ color: "green" }}>{title}</span>
        </div>
        <div className="col12 information">
          <div className="col-md-12 p-0">
            <div className="col-md-3">ĐỊA CHỈ:</div>
            <div className="col-md-9">
              <span style={{ color: "green" }}>{address}</span>
            </div>
          </div>
          <div className="col-md-12 p-0">
            <div className="col-md-3">LỊCH TÀU CHẠY:</div>
            <div className="col-md-9">
              <span style={{ color: "green" }}>{schedule}</span>
            </div>
          </div>
          <div className="col-md-12 p-0">
            <div className="col-md-3">THỨ 2 - THỨ 6</div>
            <div className="col-md-9">{weekdays}</div>
          </div>
          <div className="col-md-12 p-0">
            <div className="col-md-3">THỨ 7 - CN</div>
            <div className="col-md-9">{weekends}</div>
          </div>
          <div className="col-12">{duration}</div>
        </div>


      </div>
      <div className="col-12 map">
          <MapComponent></MapComponent> {/* Assuming MapComponent is defined */}
        </div>
    </div>
  );
};

export default SlideComponent;
