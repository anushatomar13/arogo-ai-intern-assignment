const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  slots: [
    {
      date: { type: String, required: true },
      time: { type: String, required: true }, 
    },
  ],
});

module.exports = mongoose.model("Availability", availabilitySchema);
