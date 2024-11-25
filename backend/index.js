const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const User = require("./models/user.model"); // Import User model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const userRoutes = require("./routes/user.route");
const sessionRoutes = require("./routes/session.route")
const trainRoute = require("./routes/train.route")
const ticketRoute = require("./routes/ticket.route")
app.use("/api/users", userRoutes);

// Kết nối đến MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
