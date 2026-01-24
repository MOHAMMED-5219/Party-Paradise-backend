const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

// ============================
// POST: Contact Form
// ============================
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // 1️⃣ Save to database
    const contact = new Contact({ name, email, phone, message });
    await contact.save();

    // 2️⃣ SEND EMAIL TO OWNER
    await sendEmail(
      "umarkpl4@gmail.com", // 👈 OWNER EMAIL (CHANGE THIS)
      "📩 New Contact Enquiry - Party Paradise",
      `
You have received a new enquiry from your website.

👤 Name: ${name}
📧 Email: ${email}
📞 Phone: ${phone}

💬 Message:
${message}

-------------------------
Party Paradise Website
      `
    );

    // 3️⃣ RESPONSE TO FRONTEND
    res.status(201).json({
      success: true,
      message: "Message sent successfully"
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
// GET: Admin Panel
// ============================
router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

module.exports = router;
