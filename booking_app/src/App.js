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

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <HeaderComponent></HeaderComponent>
        <Content>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/booking" element={<Booking />}></Route>
            <Route path="*" element={<Err/>}></Route>
            <Route path="/passengers" element={<Passengers/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
          </Routes>
        </Content>

        <FooterComponent></FooterComponent>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
