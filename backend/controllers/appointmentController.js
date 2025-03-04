const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const sendEmail = require("../utils/mailer");
const mongoose = require("mongoose");

// Book an appointment
const bookAppointment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

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

    const doctor = await Doctor.findById(doctorId).session(session);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const existingAppointment = await Appointment.findOne({ doctorId, date, time }).session(session);
    if (existingAppointment) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Time slot already booked" });
    }

    const appointment = new Appointment({ userId, doctorId, date, time, status: "approved" });
    await appointment.save({ session });

    await session.commitTransaction();
    session.endSession();

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
    await session.abortTransaction();
    session.endSession();
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Cancel an appointment
const cancelAppointment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ message: "Appointment ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ message: "Invalid appointment ID" });
    }

    const appointment = await Appointment.findById(appointmentId).session(session);
    if (!appointment) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Appointment not found" });
    }

    const doctor = await Doctor.findById(appointment.doctorId).session(session);
    if (!doctor) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Doctor not found" });
    }

    await Appointment.findByIdAndDelete(appointmentId).session(session);

    await session.commitTransaction();
    session.endSession();

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

    res.status(200).json({ message: "Appointment canceled successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error canceling appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Get all appointments [User]
const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await Appointment.find({ userId }).sort({ date: 1 });

    res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Get all appointments [Doctor]
const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id; // Assuming the logged-in user is a doctor

    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: "Invalid doctor ID" });
    }

    const appointments = await Appointment.find({ doctorId }).sort({ date: 1, time: 1 });

    res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching doctor's appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Reschedule appointments
const rescheduleAppointments = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { appointmentId, newDate, newTime } = req.body;
    const userId = req.user.id; 

    if (!appointmentId || !newDate || !newTime) {
      return res.status(400).json({ message: "Appointment ID, new date, and new time are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ message: "Invalid appointment ID" });
    }

    const appointment = await Appointment.findById(appointmentId).session(session);
    if (!appointment) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.userId.toString() !== userId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ message: "Not authorized to reschedule this appointment" });
    }

    const existingAppointment = await Appointment.findOne({
      doctorId: appointment.doctorId,
      date: newDate,
      time: newTime,
    }).session(session);

    if (existingAppointment) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Time slot already booked" });
    }

    appointment.date = newDate;
    appointment.time = newTime;
    appointment.updatedAt = new Date();
    await appointment.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Appointment rescheduled successfully", appointment });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error rescheduling appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get details of a single appointment
const getAppointmentDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid appointment ID" });
    }

    const appointment = await Appointment.findById(id)
      .populate("doctorId", "name email")
      .populate("userId", "name email");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ appointment });
  } catch (error) {
    console.error("Error fetching appointment details:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { 
  bookAppointment, 
  cancelAppointment, 
  getUserAppointments, 
  getDoctorAppointments,
  rescheduleAppointments,
  getAppointmentDetails 
};