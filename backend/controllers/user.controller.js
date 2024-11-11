const express = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Đăng ký người dùng
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Kiểm tra xem email đã được sử dụng chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash mật khẩu
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Tạo người dùng mới mà không cần userId (được tạo tự động)
    const newUser = new User({
      name,
      email,
      phone,
      passwordHash
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (err) {
    console.error("Error:", err); // Thêm dòng này để log chi tiết lỗi
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Đăng nhập người dùng
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm người dùng bằng email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Tạo token
    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.SECRET_ACCESS_TOKEN,
      { expiresIn: '1h' }
    );

    // Trả về token và thông tin người dùng
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.userId,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};