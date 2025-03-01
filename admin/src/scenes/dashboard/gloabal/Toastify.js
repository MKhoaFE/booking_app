import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (message, type = "success") => {
  toast[type](message, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "colored",
  });
};

export default showToast;
