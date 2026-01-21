const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

// ============================
// POST: Save Contact + Email
// ============================
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    // 📧 Send email to client
    await sendEmail(
      "New Contact Message",
      `Name: ${req.body.name}
Email: ${req.body.email}
Phone: ${req.body.phone}
Message: ${req.body.message}`
    );

    res.status(201).json({
      success: true,
      message: "Contact message saved and email sent"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
});

// ============================
// GET: All Contacts (Admin)
// ============================
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
});

// ============================
// DELETE: Contact by ID
// ============================
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});

module.exports = router;
