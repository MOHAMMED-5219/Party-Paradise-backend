const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const sendEmail = require("../utils/sendEmail");

// ============================
// POST: Save Booking + Email
// ============================
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    // 📧 Send booking email
  await sendEmail(
  "New Booking Received",
  `Name: ${req.body.name}
Email: ${req.body.email}
Phone: ${req.body.phone}
Event Date: ${req.body.eventDate}
Location: ${req.body.location}
Special Requests: ${req.body.specialRequests || "N/A"}

👉 Click here to WhatsApp customer:
https://wa.me/91${req.body.phone}
`
);



    res.status(201).json({
      success: true,
      message: "Booking saved and email sent"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Booking failed"
    });
  }
});

// ============================
// GET: All Bookings (Admin)
// ============================
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// ============================
// DELETE: Booking by ID
// ============================
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});

module.exports = router;
