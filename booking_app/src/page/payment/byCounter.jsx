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

function ByCounter() {
  const [selected, setSelected] = useState(null);

  const toggle = (option) => {
    setSelected(selected === option ? null : option);
  };

  return (
    <>
        <div className="container">
            by Counter
        </div>
    </>
  );
}

export default ByCounter;
