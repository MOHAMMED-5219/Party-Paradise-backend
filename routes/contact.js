const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Missing fields"
      });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      message
    });

    await contact.save();

    return res.status(200).json({
      success: true,
      message: "Message saved"
    });

  } catch (err) {
    console.error("CONTACT ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
