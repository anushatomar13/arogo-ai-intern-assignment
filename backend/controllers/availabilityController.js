const Availability = require("../models/availabilityModel");

// Set availability for a doctor
const setAvailability = async (req, res) => {
  try {
    const { doctorId, slots } = req.body;

    if (!doctorId || !slots || !slots.length) {
      return res.status(400).json({ message: "Doctor ID and slots are required" });
    }

    let availability = await Availability.findOne({ doctorId });

    if (availability) {
      // Update existing availability
      availability.slots = slots;
    } else {
      // Create new availability
      availability = new Availability({ doctorId, slots });
    }

    await availability.save();
    res.status(200).json({ message: "Availability updated successfully", availability });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { setAvailability };
