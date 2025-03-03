const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");

// Book an appointment
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const userId = req.user.id; 

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check if the doctor is available for the given time
    const existingAppointment = await Appointment.findOne({ doctorId, date, time });
    if (existingAppointment) {
      return res.status(400).json({ message: "Time slot already booked" });
    }

    // Create new appointment
    const appointment = new Appointment({ userId, doctorId, date, time });
    await appointment.save();

    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { bookAppointment };
