import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("token"); // Lấy token từ cookies

  if (!token) {
    // Nếu không có token, chuyển hướng đến trang login
    return <Navigate to="/login" />;
  }

  return children; // Nếu có token, cho phép truy cập
};

export default ProtectedRoute;
