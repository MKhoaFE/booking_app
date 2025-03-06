import React, { useState } from "react";
import BookingHeader from "../../components/Booking-header/bookingHeader";
import Stepbar from "../../components/StepBar/stepbar";
import {
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Divider,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

function Payment() {
  const [selected, setSelected] = useState(null);

  const toggle = (option) => {
    setSelected(selected === option ? null : option);
  };

  return (
    <>
      <BookingHeader />
      <Stepbar />
      <div className="container" style={{ marginTop: "2.5rem" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#2E7D32" }}
        >
          Phương thức thanh toán
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          gutterBottom
          sx={{ color: "#555", fontSize: "2rem" }}
        >
          Quý khách hàng vui lòng chọn hình thức thanh toán
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ fontStyle: "italic", color: "#777", mb: 4 }}
        >
          (Sau khi thanh toán thành công đơn hàng, Greenlines-DP sẽ xuất vé và
          gửi vé điện tử qua email cho quý khách. Quý khách vui lòng chọn hình
          thức thanh toán tiện lợi nhất cho mình)
        </Typography>

        <Box sx={{ mt: 2 }}>
          {/* Phương thức 1: Thẻ tín dụng */}
          <Accordion
            expanded={selected === "credit"}
            onChange={() => toggle("credit")}
            sx={{
              mb: 2,
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: "#F5F5F5",
                "&:hover": { backgroundColor: "#E8F5E9" },
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "medium", fontSize: "1.5rem" }}
              >
                Thanh toán bằng thẻ tín dụng (Visa - MasterCard)
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#FAFAFA" }}>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <Typography variant="body1" style={{ fontSize: "1.3rem" }}>
                  Test content 1 - Thanh toán qua thẻ tín dụng Visa hoặc
                  MasterCard.
                </Typography>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                >
                  <div className="btn-btm" style={{ marginBottom: "0" }}>
                    <Link to="/booking/payment/byVisa">
                      <button type="submit">
                        <span>Tiếp tục</span>
                      </button>
                    </Link>
                  </div>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Phương thức 2: Thẻ ATM */}
          <Accordion
            expanded={selected === "atm"}
            onChange={() => toggle("atm")}
            sx={{
              mb: 2,
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: "#F5F5F5",
                "&:hover": { backgroundColor: "#E8F5E9" },
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "medium", fontSize: "1.5rem" }}
              >
                Thanh toán bằng thẻ ATM
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#FAFAFA" }}>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <Typography variant="body1" style={{ fontSize: "1.3rem" }}>
                  Test content 2 - Thanh toán qua thẻ ATM nội địa.
                </Typography>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                >
                  <div className="btn-btm" style={{ marginBottom: "0" }}>
                    <Link to="/booking/payment/byATM">
                      <button type="submit">
                        <span>Tiếp tục</span>
                      </button>
                    </Link>
                  </div>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={selected === "counter"}
            onChange={() => toggle("counter")}
            sx={{
              mb: 2,
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: "#F5F5F5",
                "&:hover": { backgroundColor: "#E8F5E9" },
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "medium", fontSize: "1.5rem" }}
              >
                Thanh toán tại quầy
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#FAFAFA" }}>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <Typography variant="body1" style={{ fontSize: "1.3rem" }}>
                  Test content 3 - Thanh toán tại quầy.
                </Typography>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                >
                  <div className="btn-btm" style={{ marginBottom: "0" }}>
                    <Link to="/booking/payment/byCounter">
                      <button type="submit">
                        <span>Tiếp tục</span>
                      </button>
                    </Link>
                  </div>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{ color: "#777", fontSize: "1.5rem" }}
          >
            Vui lòng chọn phương thức thanh toán trước khi tiếp tục.
          </Typography>
        </Box>
      </div>
    </>
  );
}

export default Payment;
