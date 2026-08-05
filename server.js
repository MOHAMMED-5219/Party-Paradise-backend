const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());

// =======================
// Routes
// =======================
app.use("/api/contact", require("./routes/contact"));
app.use("/api/booking", require("./routes/booking"));

// =======================
// Root Route
// =======================
app.get("/", (req, res) => {
  res.send("🎉 Party Paradise Backend is Running Successfully!");
});

// =======================
// Health Check
// =======================
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is Healthy ✅"
  });
});

// =======================
// MongoDB Connection
// =======================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.error("Mongo Error ❌", err);
  });

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});