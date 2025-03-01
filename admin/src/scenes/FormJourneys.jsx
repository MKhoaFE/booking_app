import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import showToast from "./dashboard/gloabal/Toastify";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Title } from "@mui/icons-material";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";

function FormJourneys() {
  const navigate = useNavigate();
  const [trainId, setTrainId] = useState();
  const [vessel, setVessel] = useState();
  const [capacity, setCapacity] = useState();
  const [departureStation, setDepatureStation] = useState();
  const [arrivalStation, setArrivalStation] = useState();
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [specialSeats, setSpecialSeats] = useState();
  const [regularSeats, setRegularSeats] = useState();
  const [specialTicketPrice, setSpecialTicketPrice] = useState();
  const [regularTicketPrice, setRegularTicketPrice] = useState();
  const [specialTicketPriceError, setSpecialTicketPriceError] = useState();
  const [regularTicketPriceError, setRegularTicketPriceError] = useState();
  const [specialSeatsError, setSpecialSeatsError] = useState();
  const [regularSeatsError, setRegularSeatsError] = useState();

  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState("");

  const [trainDetails, setTrainDetails] = useState({
    capacity: "",
    departureStation: "",
    arrivalStation: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/trains")
      .then((response) => {
        setTrains(response.data.trains);
      })
      .catch((error) => {
        console.error("Lỗi lấy thông tin trains:", error);
      });
  }, []);

  //khi chọn một tàu tự cập nhập lại các input disabled
  const handleTrainChange = (event) => {
    const trainId = event.target.value;
    setSelectedTrain(trainId);
    const trainInfo = trains.find((train) => train.trainId === trainId);
    if (trainInfo) {
      setTrainDetails({
        capacity: trainInfo.capacity,
        departureStation: trainInfo.departureStation,
        arrivalStation: trainInfo.arrivalStation,
      });
    }
  };

  const formData = {
    trainId: selectedTrain,
    departureDate: departureDate?.toISOString(),
    arrivalDate: arrivalDate?.toISOString(),
    departureTime: dayjs(departureDate).format("HH:mm"),
    arrivalTime: dayjs(arrivalDate).format("HH:mm"),
    regularSeats: Number(regularSeats),
    specialSeats: Number(specialSeats),
    specialTicketPrice: Number((specialTicketPrice || "").replace(/\D/g, "")),
    regularTicketPrice: Number((regularTicketPrice || "").replace(/\D/g, "")),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedTrain ||
      !specialSeats ||
      !regularSeats ||
      !specialTicketPrice ||
      !regularTicketPrice ||
      !departureDate ||
      !arrivalDate
    ) {
      showToast("Vui lòng điền đầy đủ thông tin", "error");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/trainSchedule/addJourney", formData);
      showToast("Tạo hành trình mới thành công!", "success");
      navigate("/schedule-list");
    } catch (error) {
      showToast("Thêm hành trình thất bại, vui lòng thử lại.", "error");
      console.error(error.response?.data || error.message);
    }
  };

  const handleSpecialTicketPriceBlur = () => {
    if (specialTicketPrice === "") {
      setSpecialTicketPriceError("Vui Lòng nhập giá vé");
    } else {
      setSpecialTicketPriceError("");
    }
  };

  const handleRegualarTicketPriceBlur = () => {
    if (regularTicketPrice === "") {
      setRegularTicketPriceError("Vui lòng nhập giá vé");
    } else {
      setRegularTicketPriceError("");
    }
  };

  const handleSpecialSeatsBlur = () => {
    if (specialSeats === "") {
      setSpecialSeatsError("Vui lòng nhập số vé đặc biệt.");
    } else {
      setSpecialSeatsError("");
    }
  };

  const handleRegularSeatsBlur = () => {
    if (regularSeats === "") {
      setRegularSeatsError("Vui lòng nhập số vé thường.");
    } else {
      setRegularSeatsError("");
    }
  };

  return (
    <Box m="0.5rem 1rem">
      <Box p={2} border="1px solid #ccc" borderRadius={2} boxShadow={2}>
        <h1>Add new journey</h1>
        <sub style={{ fontSize: "1rem" }}></sub>
      </Box>
      <Formik>
        <form onSubmit={handleSubmit}>
          <Box display="block" gap="1rem" spacing={{ xs: 2, md: 3 }}>
            <Box
              display="grid"
              gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
              gap="1rem"
              justifyContent="space-between"
              sx={{ flexDirection: { xs: "column", sm: "row" } }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]} sx={{ mt: 1 }}>
                  <DateTimePicker
                    label="Departure Date/Time"
                    value={departureDate}
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
                <DemoContainer components={["DateTimePicker"]} sx={{ mt: 1 }}>
                  <DateTimePicker
                    label="Arrival Date/Time"
                    value={arrivalDate}
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
              <FormControl variant="filled" fullWidth>
                <InputLabel id="demo-simple-select-filled-label">
                  Vessel
                </InputLabel>
                <Select
                  labelId="train-select-label"
                  value={selectedTrain}
                  onChange={handleTrainChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {trains.map((train) => (
                    <MenuItem key={train.trainId} value={train.trainId}>
                      {train.trainId} - {train.vessel}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                type="text"
                variant="filled"
                fullWidth
                label="Capacity"
                name="capacity"
                defaultValue="50"
                value={trainDetails.capacity}
                disabled
              ></TextField>
              <TextField
                type="text"
                variant="filled"
                fullWidth
                label="Departure Station"
                name="departureStation"
                defaultValue="50"
                value={trainDetails.departureStation}
                disabled
              ></TextField>
              <TextField
                type="text"
                variant="filled"
                fullWidth
                label="Arrival Station"
                name="arrivalStation"
                defaultValue="50"
                value={trainDetails.arrivalStation}
                disabled
              ></TextField>
              <TextField
                type="number"
                variant="filled"
                fullWidth
                label="Special Seats"
                name="specialSeats"
                value={specialSeats}
                onBlur={handleSpecialSeatsBlur}
                onChange={(e) => setSpecialSeats(e.target.value)}
                error={Boolean(specialSeatsError)}
                helperText={specialSeatsError}
              ></TextField>
              <NumericFormat
                thousandSeparator=","
                decimalSeparator="."
                prefix="VND "
                customInput={TextField}
                variant="filled"
                fullWidth
                label="Special Ticket Price (each)"
                name="specialTicketPrice"
                onBlur={handleSpecialTicketPriceBlur}
                onChange={(e) => setSpecialTicketPrice(e.target.value)}
                error={Boolean(specialTicketPriceError)}
                helperText={specialTicketPriceError}
              />
              <TextField
                type="number"
                variant="filled"
                fullWidth
                label="Regular Seats"
                name="regularSeats"
                value={regularSeats}
                onBlur={handleRegularSeatsBlur}
                onChange={(e) => setRegularSeats(e.target.value)}
                error={Boolean(regularSeatsError)}
                helperText={regularSeatsError}
              ></TextField>
              <NumericFormat
                thousandSeparator=","
                decimalSeparator="."
                prefix="VND "
                customInput={TextField}
                variant="filled"
                fullWidth
                label="Regular Ticket Price (each)"
                name="regularTicketPrice"
                onBlur={handleRegualarTicketPriceBlur}
                onChange={(e) => setRegularTicketPrice(e.target.value)}
                error={Boolean(regularTicketPriceError)}
                helperText={regularTicketPriceError}
              />
            </Box>
            <Box display="grid" marginTop="1rem">
              <Button variant="contained" type="submit">
                + ADD
              </Button>
            </Box>
          </Box>
        </form>
      </Formik>
    </Box>
  );
}

export default FormJourneys;
