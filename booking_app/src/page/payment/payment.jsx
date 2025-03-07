import React, { useState } from "react";
import BookingHeader from "../../components/Booking-header/bookingHeader";
import Stepbar from "../../components/StepBar/stepbar";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import showToast from "../../components/Toastify/Toastify";

function Payment() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const toggle = (option) => {
    setSelected(selected === option ? null : option);
  };

  // Xử lý đặt vé tại quầy
  const handleCounterPayment = async (e) => {
    e.preventDefault();
  
    const travelData = JSON.parse(localStorage.getItem("travelData"));
    const passengerData = JSON.parse(localStorage.getItem("passengerData")) || [];
    const contactData = JSON.parse(localStorage.getItem("contactData")) || {};
  
    if (!travelData || !travelData.journeyId) {
      showToast("Không tìm thấy thông tin hành trình!", "error");
      return;
    }
  
    if (passengerData.length === 0 || Object.keys(contactData).length === 0) {
      showToast("Dữ liệu hành khách hoặc người liên lạc không đầy đủ!", "error");
      return;
    }
  
    const token = Cookies.get("token");
    if (!token) {
      showToast("Vui lòng đăng nhập để tiếp tục!", "error");
      return;
    }
  
    const bookingData = {
      contactData,
      passengerData,
    };
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/trainSchedule/bookSeats/${travelData.journeyId}`,
        {
          seatBooked: bookingData,
          regularTicketBooked: passengerData.filter((p) => p.type === "regular").length,
          specialTicketBooked: passengerData.filter((p) => p.type === "special").length,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (response.status === 200) {
        showToast("Đặt vé thành công! Vui lòng đến quầy để thanh toán.", "success");
        const { bookingData } = response.data; // Lấy dữ liệu từ response
        navigate("byCounter", {
          state: {
            travelData: {
              ...travelData,
              departureDate: bookingData.departureDate,
              departureStation: bookingData.departureStation,
              arrivalStation: bookingData.arrivalStation,
            },
            passengerData: bookingData.passengerData, // Dùng passengerData từ server (có price)
            contactData: bookingData.contactData,
            bookingId: `B${Date.now()}${Math.floor(Math.random() * 1000)}`,
          },
        });
        localStorage.removeItem("passengerData");
        localStorage.removeItem("contactData");
        localStorage.removeItem("travelData");
        localStorage.removeItem(`selectedSeats_${travelData.time}`);
      }
    } catch (error) {
      console.error("Lỗi khi đặt vé:", error);
      showToast("Đặt vé thất bại. Vui lòng thử lại!", "error");
    }
  };

  return (
    <>
      <BookingHeader />
      <Stepbar />
      <div className="container" style={{ marginTop: "2.5rem" }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#2E7D32" }}>
          Phương thức thanh toán
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom sx={{ color: "#555", fontSize: "2rem" }}>
          Quý khách hàng vui lòng chọn hình thức thanh toán
        </Typography>
        <Typography variant="body2" align="center" sx={{ fontStyle: "italic", color: "#777", mb: 4 }}>
          (Sau khi thanh toán thành công đơn hàng, Greenlines-DP sẽ xuất vé và gửi vé điện tử qua email cho quý khách. Quý khách vui lòng chọn hình thức thanh toán tiện lợi nhất cho mình)
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Accordion expanded={selected === "credit"} onChange={() => toggle("credit")} sx={{ mb: 2, borderRadius: 2, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#F5F5F5", "&:hover": { backgroundColor: "#E8F5E9" } }}>
              <Typography variant="h6" sx={{ fontWeight: "medium", fontSize: "1.5rem" }}>
                Thanh toán bằng thẻ tín dụng (Visa - MasterCard)
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#FAFAFA" }}>
              <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <Typography variant="body1" style={{ fontSize: "1.3rem" }}>
                  Test content 1 - Thanh toán qua thẻ tín dụng Visa hoặc MasterCard.
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                  <div className="btn-btm" style={{ marginBottom: "0" }}>
                    <Link to="/booking/payment/byVisa"><button type="submit"><span>Tiếp tục</span></button></Link>
                  </div>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={selected === "atm"} onChange={() => toggle("atm")} sx={{ mb: 2, borderRadius: 2, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#F5F5F5", "&:hover": { backgroundColor: "#E8F5E9" } }}>
              <Typography variant="h6" sx={{ fontWeight: "medium", fontSize: "1.5rem" }}>
                Thanh toán bằng thẻ ATM
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#FAFAFA" }}>
              <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <Typography variant="body1" style={{ fontSize: "1.3rem" }}>
                  Test content 2 - Thanh toán qua thẻ ATM nội địa.
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                  <div className="btn-btm" style={{ marginBottom: "0" }}>
                    <Link to="/booking/payment/byATM"><button type="submit"><span>Tiếp tục</span></button></Link>
                  </div>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={selected === "counter"} onChange={() => toggle("counter")} sx={{ mb: 2, borderRadius: 2, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#F5F5F5", "&:hover": { backgroundColor: "#E8F5E9" } }}>
              <Typography variant="h6" sx={{ fontWeight: "medium", fontSize: "1.5rem" }}>
                Thanh toán tại quầy
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#FAFAFA" }}>
              <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <Typography variant="body1" style={{ fontSize: "1.3rem" }}>
                  Test content 3 - Thanh toán tại quầy.
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                  <div className="btn-btm" style={{ marginBottom: "0" }}>
                    <button onClick={handleCounterPayment}><span>Tiếp tục</span></button>
                  </div>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "#777", fontSize: "1.5rem" }}>
            Vui lòng chọn phương thức thanh toán trước khi tiếp tục.
          </Typography>
        </Box>
      </div>
    </>
  );
}

export default Payment;