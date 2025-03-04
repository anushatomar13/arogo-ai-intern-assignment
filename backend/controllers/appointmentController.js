const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const sendEmail = require("../utils/mailer");
const mongoose = require("mongoose");

// Book an appointment
const bookAppointment = async (req, res) => {
  try {
    const doctorId = req.body.doctorId?.trim() || "";
    const { date, time } = req.body;
    const userId = req.user.id;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: "Doctor ID, date, and time are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: "Invalid doctor ID" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const existingAppointment = await Appointment.findOne({ doctorId, date, time });
    if (existingAppointment) {
      return res.status(400).json({ message: "Time slot already booked" });
    }

    const appointment = new Appointment({ userId, doctorId, date, time, status: "approved" });
    await appointment.save();

    if (req.user.email) {
      try {
        await sendEmail(
          req.user.email,
          "Appointment Confirmation",
          `Your appointment with Dr. ${doctor.name} on ${appointment.date} at ${appointment.time} has been successfully booked.`
        );
      } catch (error) {
        console.error("Failed to send patient email:", error);
      }
    }

    if (doctor.email) {
      try {
        await sendEmail(
          doctor.email,
          "New Appointment Booking",
          `You have a new appointment with ${req.user.name} on ${appointment.date} at ${appointment.time}.`
        );
      } catch (error) {
        console.error("Failed to send doctor email:", error);
      }
    }

    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Cancel an appointment
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ message: "Appointment ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ message: "Invalid appointment ID" });
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const doctor = await Doctor.findById(appointment.doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (req.user.email) {
      try {
        await sendEmail(
          req.user.email,
          "Appointment Cancellation",
          `Your appointment with Dr. ${doctor.name} on ${appointment.date} at ${appointment.time} has been canceled.`
        );
      } catch (error) {
        console.error("Failed to send patient email:", error);
      }
    }

    if (doctor.email) {
      try {
        await sendEmail(
          doctor.email,
          "Appointment Canceled",
          `The appointment with ${req.user.name} on ${appointment.date} at ${appointment.time} has been canceled.`
        );
      } catch (error) {
        console.error("Failed to send doctor email:", error);
      }
    }

    await Appointment.findByIdAndDelete(appointmentId);
    res.status(200).json({ message: "Appointment canceled successfully" });
  } catch (error) {
    console.error("Error canceling appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { bookAppointment, cancelAppointment };