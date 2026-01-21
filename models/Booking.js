const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  packageId: String,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  eventDate: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  specialRequests: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
