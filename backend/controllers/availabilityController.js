const Availability = require("../models/availabilityModel");

// Set availability for a doctor
const setAvailability = async (req, res) => {
  try {
    const { doctorId, workingHours, locations } = req.body;

    if (!doctorId || !workingHours?.length || !locations?.length) {
      return res.status(400).json({ message: "Doctor ID, working hours, and locations are required" });
    }

    let availability = await Availability.findOne({ doctorId });

    if (availability) {

      availability.workingHours = workingHours;
      availability.locations = locations;
      
    } else {
      availability = new Availability({ doctorId, workingHours, locations });
    }

    await availability.save();
    res.status(200).json({ message: "Availability updated successfully", availability });
  } catch (error) {
    console.error("Error setting availability:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get availability for a doctor
const getAvailability = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const availability = await Availability.findOne({ doctorId });

    if (!availability) {
      return res.status(404).json({ message: "No availability found" });
    }

    res.status(200).json(availability);
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { setAvailability, getAvailability };
