import React, { useEffect, useState } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import showToast from "./dashboard/gloabal/Toastify";

function FormTrips() {
  const navigate = useNavigate();
  const [trainId, setTrainId] = useState();
  const [vessel, setVessel] = useState();
  const [capacity, setCapacity] = useState();
  const [departureStation, setDepatureStation] = useState();
  const [arrivalStation, setArrivalStation] = useState();
  const [trainIdError, setTrainIdError] = useState();
  const [vesselError, setVesselError] = useState();
  const [capacityError, setCapacityError] = useState();
  const [departureStationError, setDepatureStationError] = useState();
  const [arrivalStationError, setArrivalStationError] = useState();

  const formData = {
    trainId: trainId,
    vessel: vessel,
    capacity: capacity,
    departureStation: departureStation,
    arrivalStation: arrivalStation,
  };

  useEffect(() => {
    const fetchLatestTrainId = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/trains/lastestId"
        );
        const latestId = response.data.trainId; // Giả sử API trả về { trainId: "T012" }
        if (latestId) {
          // Tăng trainId lên 1 đơn vị (T012 -> T013)
          const newId = `T${String(parseInt(latestId.slice(1)) + 1).padStart(
            3,
            "0"
          )}`;
          setTrainId(newId);
        } else {
          setTrainId("T001"); // Nếu không có dữ liệu, bắt đầu từ T001
        }
      } catch (error) {
        console.error("Lỗi khi lấy trainId mới nhất:", error);
        showToast("Không thể lấy trainId mới nhất!", "error");
      }
    };

    fetchLatestTrainId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validate input fields
    if (
      !trainId ||
      !vessel ||
      !capacity ||
      !departureStation ||
      !arrivalStation
    ) {
      showToast("Vui lòng điền đầy đủ thông tin", "error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/trains/addTrips",
        formData
      );
      showToast("Thêm hành trình tàu mới thành công ", "success");
      console.log(response.data);
      navigate("/Trips");
    } catch (error) {
      showToast("Thêm hành trình thất bại, vui lòng thử lại.", "error");
      console.error(error.response?.data || error.message);
    }
  };

  const handleTrainIdBlur = () => {
    if (trainId === "") {
      setTrainIdError("Vui lòng nhập ID tàu");
    } else {
      setTrainIdError("");
    }
  };

  const handleVesselBlur = () => {
    if (vessel === "") {
      setVesselError("Vui lòng nhập tên tàu");
    } else {
      setVesselError("");
    }
  };

  const handleCapacityBlur = () => {
    if (capacity === "") {
      setCapacityError("Vui lòng nhập số lượng ghế ngồi");
    } else {
      setCapacityError("");
    }
  };

  const handleDepatureStationBlur = () => {
    if (departureStation === "") {
      setDepatureStationError("Vui lòng nhập nơi đi");
    } else {
      setDepatureStationError("");
    }
  };

  const handleArrivalStationBlur = () => {
    if (arrivalStation === "") {
      setArrivalStationError("Vui lòng nhập nơi đến");
    } else {
      setArrivalStationError("");
    }
  };

  return (
    <Box m="0.5rem 1rem">
      <Box p={2} border="1px solid #ccc" borderRadius={2} boxShadow={2}>
        <h1>All trips list</h1>
        <sub style={{ fontSize: "1rem" }}>Create new trip</sub>
      </Box>
      <Formik>
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="1rem"
            spacing={{ xs: 2, md: 3 }}
            sx={{
              "& > div": {
                // gridColumn: isNonMobile ? "span 12" : "span 12",
              },
            }}
          >
            <TextField
              style={{ marginTop: "1rem" }}
              type="text"
              variant="filled"
              fullWidth
              name="trainId"
              value={trainId}
              onBlur={handleTrainIdBlur}
              onChange={(e) => setTrainId(e.target.value)}
              error={Boolean(trainIdError)}
              helperText={trainIdError}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            ></TextField>
            <TextField
              type="text"
              variant="filled"
              fullWidth
              label="Vessel"
              name="vessel"
              value={vessel}
              onBlur={handleVesselBlur}
              onChange={(e) => setVessel(e.target.value)}
              error={vesselError}
              helperText={vesselError}
            ></TextField>
            <TextField
              type="text"
              variant="filled"
              fullWidth
              label="Departure Station"
              name="departureStation"
              value={departureStation}
              onBlur={handleDepatureStationBlur}
              onChange={(e) => setDepatureStation(e.target.value)}
              error={departureStationError}
              helperText={departureStationError}
            ></TextField>
            <TextField
              type="text"
              variant="filled"
              fullWidth
              label="Arrival Station"
              name="arrivalStation"
              value={arrivalStation}
              onBlur={handleArrivalStationBlur}
              onChange={(e) => setArrivalStation(e.target.value)}
              error={arrivalStationError}
              helperText={arrivalStationError}
            ></TextField>
            <TextField
              type="number"
              variant="filled"
              fullWidth
              label="Capacity"
              name="capacity"
              value={capacity}
              onBlur={handleCapacityBlur}
              onChange={(e) => setCapacity(e.target.value)}
              error={Boolean(capacityError)}
              helperText={capacityError}
            ></TextField>

            <Button variant="contained" type="submit">
              + ADD
            </Button>
          </Box>
        </form>
      </Formik>
    </Box>
  );
}

export default FormTrips;
