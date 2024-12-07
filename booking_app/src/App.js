import React from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./GlobalStyles/glbStyles.css";
import HeaderComponent from "./components/Header/HeaderComponent.jsx";
import Home from "../src/page/home/Home.jsx";
import FooterComponent from "./components/Footer/FooterComponent.jsx";
import { Layout } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Content } from "antd/es/layout/layout.js";
import Err from "./page/error/Err.jsx";
import Booking from "./page/booking/Booking.jsx";
import Passengers from "./page/passengers/passengers.jsx";
import Login from "./page/login/login.jsx";
import Signup from "./page/signup/signup.jsx";
import Payment from "./page/payment/payment.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.js";

function App() {
  return (
<BrowserRouter>
  <Layout style={{ backgroundColor: "#FFF" }}>
    <HeaderComponent />
    <Content>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/booking/seats" 
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/booking/passengers" 
          element={
            <ProtectedRoute>
              <Passengers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/booking/payment" 
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } 
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Err />} />
      </Routes>
    </Content>
    <FooterComponent />
  </Layout>
</BrowserRouter>

  );
}

export default App;
