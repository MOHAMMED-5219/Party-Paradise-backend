const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// ================= POST: SAVE CONTACT =================
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// ================= GET: ALL CONTACTS =================
router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

// ================= DELETE: CONTACT =================
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
