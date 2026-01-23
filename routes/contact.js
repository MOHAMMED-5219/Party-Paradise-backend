const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

// ============================
// POST: Contact Form
// ============================
router.post("/", async (req, res) => {
  try {
    // 1️⃣ Save to database
    const contact = new Contact(req.body);
    await contact.save();

    // 2️⃣ Send EMAIL TO CUSTOMER (NOT OWNER)
    await sendEmail(
      req.body.email,
      "Thank you for contacting Party Paradise 🎉",
      `Hi ${req.body.name},

Thank you for contacting Party Paradise.

We have received your message successfully.
Our team will call you shortly to discuss your event.

📞 Phone: ${req.body.phone}

Regards,
Party Paradise Decoration Team`
    );

    // 3️⃣ Response
    res.status(201).json({
      success: true,
      message: "Message saved & email sent"
    });

  } catch (error) {
    console.error("❌ Contact error:", error);
    res.status(500).json({
      success: false,
      message: "Email failed"
    });
  }
});

// ============================
// GET: Admin
// ============================
router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

module.exports = router;
