const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// ============================
// POST: Contact Form
// ============================
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: "Message saved successfully",
    });
  } catch (error) {
    console.error("❌ Contact error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ============================
// GET: Admin Panel
// ============================
router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

module.exports = router;
