import "./App.css";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/dashboard/gloabal/Topbar";
import Sidebar from "./scenes/dashboard/gloabal/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/Invoices";
import Contact from "./scenes/ManageTrips";
import Bar from "./scenes/Bar";
import Pie from "./scenes/Pie";
import User from "./scenes/User";
import ScheduleList from "./scenes/ScheduleList";
import { useState } from "react";
import FormUsers from "./scenes/FormUsers";
import FormTrips from "./scenes/FormTrips";
import { ToastContainer } from "react-toastify";
import FormJourneys from "./scenes/FormJourneys";
function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ToastContainer/>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/trips" element={<Contact />} />
              <Route path="/user-list" element={<User />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/user-list/addUsers" element={<FormUsers />} />
              <Route path="/Trips/addTrips" element={<FormTrips />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/schedule-list" element={<ScheduleList />} />
              <Route path="/schedule-list/newJourney" element={<FormJourneys />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
