const express = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

// Đăng ký người dùng
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Kiểm tra xem email đã được sử dụng chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash mật khẩu
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      phone,
      passwordHash,
    });

    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (err) {
    console.error("Error:", err); // Thêm dòng này để log chi tiết lỗi
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Đăng nhập người dùng
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm người dùng bằng email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Tạo token
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.SECRET_ACCESS_TOKEN,
      { expiresIn: "1h" }
    );

    await User.updateOne(
      { _id: user._id },
      { $push: { tokens: { token, createdAt: new Date() } } }
    );

    // Trả về token và thông tin người dùng
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is missing!",
      });
    }

    const tokens = req.user.tokens || [];
    const newTokens = tokens.filter((t) => t.token !== token);

    if (tokens.length === newTokens.length) {
      return res.status(404).json({
        success: false,
        message: "Token not found in user's session",
      });
    }

    // Cập nhật tokens
    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });

    return res.status(200).json({
      success: true,
      message: "Sign out successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users: ", error);
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

//add user
exports.addUsers = async (req, res) => {
  try {
    const { email, name } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(200).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User không tồn tại" });
    }

    await User.deleteOne({ userId });
    return res.status(200).json({ message: " Xóa user thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa user: ", error);
    return res.status(500).json({ message: "LỖi server", error });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "SECRET_ACCESS_TOKEN", { expiresIn: "1h" });
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "khoahocgioi9@gmail.com",
        pass: "utbg einq rtbu rlyx",
      },
    });

    const resetLink = `http://localhost:3000/login/resetPassword/${token}`;

    const mailOptions = {
      from: "khoahocgioi9@gmail.com",
      to: email,
      subject: "Reset Mật Khẩu",
      html: `
        <p>Bạn đã yêu cầu reset mật khẩu.</p>
        <p>Vui lòng click vào link sau để đặt lại mật khẩu:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Link này sẽ hết hạn sau 1 giờ.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email reset mật khẩu đã được gửi!" });
  } catch (error) {
    console.error("Lỗi khi gửi email reset mật khẩu:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

// 2. API Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Mật khẩu phải dài ít nhất 8 ký tự." });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn." });
    }

    user.passwordHash = password; // Sửa từ password thành passwordHash
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Đặt lại mật khẩu thành công!" });
  } catch (error) {
    console.error("Lỗi khi reset mật khẩu:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const users = await User.find().select("bookings");
    const transactions = users.flatMap(user =>
      user.bookings.map((booking, index) => ({
        id: `${user._id}-${index}`,
        userId: user._id,
        name: booking.contactData.name,
        email: booking.contactData.email,
        cost: booking.passengerData.reduce((total, p) => total + p.price, 0),
        phone: booking.contactData.phone,
        date: booking.bookingDate,
        journeyId: booking.journeyId,
      }))
    );
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};