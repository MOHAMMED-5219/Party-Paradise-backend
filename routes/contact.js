const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST - save contact
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const contact = new Contact({ name, email, phone, message });
    await contact.save();

    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// GET - fetch all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json([]);
  }
});

// ✅ DELETE - THIS IS IMPORTANT
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
