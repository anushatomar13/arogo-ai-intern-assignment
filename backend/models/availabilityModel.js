const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  workingHours: [
    {
      day: { type: String, required: true },
      slots: [{ type: String, required: true }], 
    },
  ],
  locations: [
    {
      name: { type: String, required: true }, 
      address: { type: String, required: true }, 
    },
  ],
});

module.exports = mongoose.model("Availability", availabilitySchema);
