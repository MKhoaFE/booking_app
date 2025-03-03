import * as React from "react";
import PropTypes from "prop-types";
import { styled, css, Box } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import Fade from "@mui/material/Fade";
import { Button } from "@mui/base/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Formik } from "formik";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";
import showToast from "./Toastify";
import axios from "axios";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useEffect } from "react";
export default function ModalPopup({ open, handleClose, journeyId }) {
  const [departureDate, setDepartureDate] = useState();
  const [arrivalDate, setArrivalDate] = useState(null);
  const [trainSchedule, setTrainSchedule] = useState(null);

  useEffect(() => {}, [trainSchedule]);
  useEffect(() => {
    if (open && journeyId) {
      axios
        .get(
          `http://localhost:5000/api/trainSchedule/getJourneyById/${journeyId}`
        )
        .then((response) => {
          setTrainSchedule(response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu:", error);
        });
    }
  }, [open, journeyId]);

  useEffect(() => {
    if (trainSchedule?.journey?.departureDate) {
      setDepartureDate(dayjs(trainSchedule.journey.departureDate));
    }

    if (trainSchedule?.journey?.arrivalDate) {
      setArrivalDate(dayjs(trainSchedule.journey.arrivalDate));
    }

    const fetchJourneyData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/trainSchedule/updateJourney/${journeyId}`
        );
        const data = await response.json();
        if (data.journey) {
          setDepartureDate(dayjs(data.journey.departureDate));
          setArrivalDate(dayjs(data.journey.arrivalDate));
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu hành trình:", error);
      }
    };

    if (journeyId) fetchJourneyData();
  }, [trainSchedule, journeyId]);

  const handleUpdateJourney = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/trainSchedule/updateJourney/${journeyId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            departureDate: departureDate.toISOString(),
            arrivalDate: arrivalDate.toISOString(),
          }),
        }
      );
      console.log("Dữ liệu gửi lên server:", {
        departureDate: departureDate.toISOString(),
        arrivalDate: arrivalDate.toISOString(),
      });
      const result = await response.json();
      if (response.ok) {
        showToast("Cập nhật hành trình thành công!", "success");
        handleClose();
      } else {
        showToast(`Lỗi: ${result.message}`, "error");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật hành trình:", error);
      showToast("Cập nhật thất bại!", "error");
    }
  };
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: StyledBackdrop }}
    >
      <Fade in={open}>
        <ModalContent sx={style}>
          <Formik>
            {trainSchedule ? (
              <form>
                <h1>
                  Thông tin hành trình: {trainSchedule.journey.journeyId}{" "}
                </h1>
                <div style={{ fontSize: "1rem" }}>
                  Tình trạng:{" "}
                  <span
                    style={{
                      color:
                        trainSchedule.journey.status === "active"
                          ? "green"
                          : trainSchedule.journey.status === "in progress"
                          ? "orange"
                          : "red",
                    }}
                  >
                    {trainSchedule.journey.status}
                  </span>{" "}
                </div>
                <Box display="block" gap="1rem" spacing={{ xs: 2, md: 3 }}>
                  <Box
                    display="grid"
                    gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
                    gap="1rem"
                    justifyContent="space-between"
                    sx={{ flexDirection: { xs: "column", sm: "row" } }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DateTimePicker"]}
                        sx={{ mt: 1 }}
                      >
                        <DateTimePicker
                          label="Departure Date/Time"
                          value={departureDate ? dayjs(departureDate) : null}
                          onChange={(newValue) => {
                            setDepartureDate(newValue);
                          }}
                          slotProps={{
                            textField: { fullWidth: true, margin: "normal" },
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DateTimePicker"]}
                        sx={{ mt: 1 }}
                      >
                        <DateTimePicker
                          label="Arrival Date/Time"
                          value={arrivalDate ? dayjs(arrivalDate) : null}
                          onChange={(newValue) => {
                            setArrivalDate(newValue);
                          }}
                          slotProps={{
                            textField: { fullWidth: true, margin: "normal" },
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>
                  <Box
                    display="grid"
                    gap="1rem"
                    gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
                    marginTop="1rem"
                  >
                    <TextField
                      type="text"
                      variant="filled"
                      fullWidth
                      label="TrainID"
                      name="trainId"
                      value={trainSchedule?.journey?.trainId || ""}
                      disabled
                    />
                    <TextField
                      type="text"
                      variant="filled"
                      fullWidth
                      label="Capacity"
                      name="capacity"
                      value={
                        trainSchedule?.journey?.specialSeats +
                          trainSchedule?.journey?.regularSeats || ""
                      }
                      disabled
                    ></TextField>
                    <TextField
                      type="text"
                      variant="filled"
                      fullWidth
                      label="Departure Station"
                      name="departureStation"
                      defaultValue="50"
                      value={trainSchedule?.journey?.departureStation || ""}
                      disabled
                    ></TextField>
                    <TextField
                      type="text"
                      variant="filled"
                      fullWidth
                      label="Arrival Station"
                      name="arrivalStation"
                      value={trainSchedule?.journey?.arrivalStation || ""}
                      disabled
                    ></TextField>
                    <TextField
                      type="number"
                      variant="filled"
                      value={trainSchedule?.journey?.specialSeats || ""}
                      fullWidth
                      label="Special Seats"
                      name="specialSeats"
                      disabled
                    ></TextField>
                    <NumericFormat
                      thousandSeparator=","
                      decimalSeparator="."
                      prefix="VND "
                      disabled
                      style={{ paddingLeft: "0.5rem" }}
                      value={trainSchedule?.journey?.specialTicketPrice || ""}
                      variant="filled"
                      fullWidth
                      label="Special Ticket Price (each)"
                      name="specialTicketPrice"
                    />
                    <TextField
                      type="number"
                      variant="filled"
                      value={trainSchedule?.journey?.regularSeats || ""}
                      fullWidth
                      label="Regular Seats"
                      name="regularSeats"
                      disabled
                    ></TextField>
                    <NumericFormat
                      thousandSeparator=","
                      decimalSeparator="."
                      prefix="VND "
                      value={trainSchedule?.journey?.regularTicketPrice || ""}
                      disabled
                      variant="filled"
                      style={{ paddingLeft: "0.5rem" }}
                      fullWidth
                      label="Regular Ticket Price (each)"
                      name="regularTicketPrice"
                    />
                    <TextField
                      type="number"
                      variant="filled"
                      value={trainSchedule?.journey?.specialTicketBooked || ""}
                      fullWidth
                      label="Special Seats Booked"
                      name="specialTicketBooked"
                      disabled
                    ></TextField>
                    <TextField
                      type="number"
                      variant="filled"
                      value={trainSchedule?.journey?.regularTicketBooked || ""}
                      fullWidth
                      label="Regular Seats Booked"
                      name="regularTicketBooked"
                      disabled
                    ></TextField>
                    <div style={{ display: "block" }}>
                      <div>
                        Pending ticket:{" "}
                        {trainSchedule.journey.specialSeats +
                          trainSchedule.journey.regularSeats -
                          trainSchedule.journey.regularTicketBooked -
                          trainSchedule.journey.specialTicketBooked}
                      </div>
                      <div>Đã thanh toán: {trainSchedule.journey.regularTicketPaid} Vé thường, {trainSchedule.journey.specialTicketPaid} Vé đặc biệt.</div>
                    </div>
                  </Box>
                </Box>
              </form>
            ) : (
              <p>Loading...</p>
            )}
          </Formik>
          <Button
            style={{ padding: "0.5rem" }}
            variant="contained"
            onClick={handleUpdateJourney}
          >
            Update hành trình
          </Button>
          <Button style={{ padding: "0.5rem" }} onClick={handleClose}>
            Close
          </Button>
        </ModalContent>
      </Fade>
    </Modal>
  );
}

ModalPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette?.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette?.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette?.mode === "dark"
        ? "rgb(0 0 0 / 0.5)"
        : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette?.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette?.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);
