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
// Tạo component App
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <HeaderComponent></HeaderComponent>
        <Content>
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="*" element={<Err/>}></Route>
          </Routes>
        </Content>

        <FooterComponent></FooterComponent>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
