const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

/* =========================
   POST: Save contact message
   ========================= */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      message
    });

    await contact.save();

    return res.status(200).json({
      success: true,
      message: "Message saved successfully"
    });

  } catch (error) {
    console.error("CONTACT POST ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

/* =========================
   GET: All contact messages (Admin)
   ========================= */
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("CONTACT GET ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts"
    });
  }
});

/* =========================
   DELETE: Contact by ID (Admin)
   ========================= */
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Message deleted"
    });
  } catch (error) {
    console.error("CONTACT DELETE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Delete failed"
    });
  }
});

module.exports = router;
