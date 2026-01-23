const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

// ============================
// POST: Save Contact + Auto Reply to Customer
// ============================
router.post("/", async (req, res) => {
  try {
    // 1. Save message in DB
    const contact = new Contact(req.body);
    await contact.save();

    // 2. Send THANK YOU email to CUSTOMER
    await sendEmail(
      req.body.email, // 👈 CUSTOMER EMAIL
      "Thank you for contacting Party Paradise 🎉",
      `Hi ${req.body.name},

Thank you for contacting Party Paradise.

We have received your message and our team will call you very soon.

📞 Phone: ${req.body.phone}

Regards,
Party Paradise Team
`
    );

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = router;
