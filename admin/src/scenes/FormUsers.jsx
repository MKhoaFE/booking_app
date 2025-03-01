import React, { useState } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import showToast from "./dashboard/gloabal/Toastify";

function FormUsers() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repasswordError, setRepasswordError] = useState("");
  const [phonenumberError, setPhonenumberError] = useState("");

  const formData = {
    name: fullname,
    password: password,
    phone: phone,
    email: email,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validate input fields
    if (!fullname || !email || !password || !repassword || !phone) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (password != repassword) {
      setRepasswordError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        formData
      );
      showToast("Thêm user thành công", "success");
      console.log(response.data);
      navigate("/user-list");
    } catch (error) {
      showToast("Thêm user thất bại, vui lòng thử lại.", "error");
      console.error(error.response?.data || error.message);
    }
  };

  const handleEmailBlur = () => {
    if (email === "") {
      setEmailError("Vui lòng nhập Email");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneNumberBlur = () => {
    if (phone === "") {
      setPhonenumberError("Vui lòng nhập SĐT");
    } else {
      setPhonenumberError("");
    }
  };

  const handleFullnameBlur = () => {
    if (fullname === "") {
      setFullnameError("Vui lòng nhập họ tên");
    } else {
      setFullnameError("");
    }
  };

  const handlePasswordBlur = () => {
    if (password === "") {
      setPasswordError("Vui lòng nhập mật khẩu");
    } else {
      setPasswordError("");
    }
  };

  const handleRepasswordBlur = () => {
    if (repassword === "") {
      setRepasswordError("Vui lòng nhập mật khẩu");
    } else {
      setRepasswordError("");
    }
  };

  return (
    <Box m="0.5rem 1rem">
      <Box p={2} border="1px solid #ccc" borderRadius={2} boxShadow={2}>
        <h1>User list</h1>
        <sub style={{ fontSize: "1rem" }}>Create new user</sub>
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
              label="Name"
              name="name"
              value={fullname}
              onBlur={handleFullnameBlur}
              onChange={(e) => setFullname(e.target.value)}
              error={Boolean(fullnameError)}
              helperText={fullnameError}
            ></TextField>
            <TextField
              type="text"
              variant="filled"
              fullWidth
              label="Email"
              name="email"
              value={email}
              onBlur={handleEmailBlur}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailError}
            ></TextField>
            <TextField
              type="password"
              variant="filled"
              fullWidth
              label="Password"
              name="password"
              value={password}
              onBlur={handlePasswordBlur}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordError}
            ></TextField>
            <TextField
              type="password"
              variant="filled"
              fullWidth
              label="Password"
              name="password"
              value={repassword}
              onBlur={handleRepasswordBlur}
              onChange={(e) => setRepassword(e.target.value)}
              error={repasswordError}
              helperText={repasswordError}
            ></TextField>
            <TextField
              type="number"
              variant="filled"
              fullWidth
              label="Phonenumber"
              name="phone"
              value={phone}
              onBlur={handlePhoneNumberBlur}
              onChange={(e) => setPhone(e.target.value)}
              error={Boolean(phonenumberError)}
              helperText={phonenumberError}
            ></TextField>

            <Button variant="contained" type="submit">
              Add user
            </Button>
          </Box>
        </form>
      </Formik>
    </Box>
  );
}

export default FormUsers;
