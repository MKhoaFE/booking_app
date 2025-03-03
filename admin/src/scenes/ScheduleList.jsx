import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { tokens } from "../theme";
import { formatDate } from "@fullcalendar/core";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import showToast from "./dashboard/gloabal/Toastify";
import { toast } from "react-toastify";
import ClearIcon from "@mui/icons-material/Clear";
import SettingsIcon from "@mui/icons-material/Settings";
import ModalPopup from "../scenes/dashboard/gloabal/ModalPopup";

export default function ScheduleList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [open, setOpen] = useState(false);

  const [selectedJourneyId, setSelectedJourneyId] = useState(null);

  const handleOpenModal = (journeyId) => {
    console.log("Journey ID:", journeyId); // Kiểm tra giá trị
    if (!journeyId) {
      console.error("Error: Journey ID is undefined");
      return;
    }
    setSelectedJourneyId(journeyId);
    setOpen(true);
  };

  useEffect(() => {
    // Gọi API để lấy danh sách hành trình từ backend
    const fetchTrainSchedules = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/trainSchedule"
        ); // Đổi URL theo backend của bạn
        const trainSchedules = response.data.trainSchedules;

        // Chuyển đổi dữ liệu từ backend về format phù hợp với FullCalendar
        const formattedEvents = trainSchedules.map((train) => ({
          id: train.journeyId,
          title: `Train ${train.trainId}: ${train.departureStation} → ${train.arrivalStation}`,
          start: train.departureDate,
          end: train.arrivalDate,
          allDay: true, // Coi như sự kiện cả ngày
        }));

        setCurrentEvents(formattedEvents);
        localStorage.setItem("events", JSON.stringify(formattedEvents)); // Lưu vào local storage
      } catch (error) {
        console.error("Error fetching train schedules:", error);
      }
    };

    fetchTrainSchedules();
  }, []);

  const saveEventsToLocalStorage = (events) => {
    localStorage.setItem("events", JSON.stringify(events));
  };

  const handleDelete = async (journeyId) => {
    try {
      console.log("Đang xóa hành trình: ", journeyId);
      await axios.delete(
        `http://localhost:5000/api/trainSchedule/deleteJourney/${journeyId}`
      );
      showToast("Xóa hành trình thành công", "success");
    } catch (error) {
      showToast("Xóa hành trình thất bại!", "error");
      console.error(
        "Lỗi khi xóa hành trình: ",
        error.response?.data || error.message
      );
    }
  };

  const handleEventClick = (selected) => {
    toast.warn(
      <div>
        <p>
          Are you sure you want to delete this event{" "}
          <b>{selected.event.title}</b>?
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <button
            style={{
              padding: "5px 10px",
              border: "none",
              background: "#d9534f",
              color: "white",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={async () => {
              try {
                await handleDelete(selected.event.id);
                setCurrentEvents((prevEvent) => {
                  const updatedEvents = prevEvent.filter(
                    (event) => event.id !== selected.event.id
                  );
                  saveEventsToLocalStorage(updatedEvents);
                  return updatedEvents;
                });
                showToast("Event Đã xóa thành công", "success");
              } catch (error) {
                showToast("Lỗi khi xóa event", "error");
              }
              toast.dismiss();
            }}
          >
            Yes, Delete
          </button>
          <button
            style={{
              padding: "5px 10px",
              border: "none",
              background: "#5bc0de",
              color: "white",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        hideProgressBar: true,
      }
    );
  };

  const handleEventDrop = (info) => {
    // Find the event in the current events state
    const updatedEvents = currentEvents.map((event) => {
      if (event.id === info.event.id) {
        // Update the event's start and end dates
        return {
          ...event,
          start: info.event.startStr,
          end: info.event.endStr,
        };
      }
      return event;
    });

    // Update the state and local storage with the updated events
    setCurrentEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
  };

  return (
    <Box m="0.5rem 1rem">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        border="1px solid #ccc"
        borderRadius={2}
        boxShadow={2}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          textAlign: { xs: "center", sm: "left" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            Schedule List
          </h1>
          <sub style={{ fontSize: "0.875rem" }}>
            Manage and organize all journeys and events
          </sub>
        </div>

        <Link to="/schedule-list/newJourney">
          <Button
            variant="contained"
            sx={{
              width: { xs: "100%", sm: "auto" },
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            + New journey
          </Button>
        </Link>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={{ xs: "column", sm: "row" }}
      >
        {/* calendar sidebar */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          borderRadius="0.5rem"
          p="1rem"
          m="1rem 0rem"
        >
          <Typography variant="h6">List</Typography>
          <List>
            {currentEvents.length === 0 ? (
              <Typography variant="h6" color="textSecondary">
                No Events
              </Typography>
            ) : (
              currentEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Button
                      style={{
                        marginRight: "0",
                        padding: "0",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      variant="contain"
                      color="secondary"
                      onClick={() => {
                        handleEventClick({
                          event: { id: event.id, title: event.title },
                        });
                      }}
                    >
                      <ClearIcon />
                    </Button>
                    <Button
                      style={{
                        margin: "0",
                        padding: "0",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      variant="filled"
                      color="secondary"
                      onClick={() => handleOpenModal(event.id)}
                    >
                      <SettingsIcon />
                    </Button>
                    <ModalPopup
                      open={open}
                      handleClose={() => setOpen(false)}
                      title="h1"
                      journeyId={selectedJourneyId}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            )}
          </List>
        </Box>
        {/* calendar */}
        <Box flex="1 1 80%" borderRadius="0.5rem" p="1rem">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            eventClick={handleEventClick}
            events={currentEvents} // events that are shown on calendar
            eventDrop={handleEventDrop} //when event is dragged from one date to another
          />
        </Box>
      </Box>
    </Box>
  );
}
