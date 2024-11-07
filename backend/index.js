// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const User = require("./models/user.model"); // Import User model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối đến MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    createUser();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Hàm tạo người dùng mới
async function createUser() {
  try {
    const newUser = new User({
      userId: 'U12345',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+123456789',
      passwordHash: 'hashed_password'  // Lưu ý: Cần hash mật khẩu thực tế trước khi lưu
    });
    
    const savedUser = await newUser.save();
    console.log("User created:", savedUser);

    // Ngắt kết nối sau khi hoàn thành
    mongoose.connection.close();
  } catch (err) {
    console.error("Error creating user:", err.message);
    mongoose.connection.close();
  }
}
// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
