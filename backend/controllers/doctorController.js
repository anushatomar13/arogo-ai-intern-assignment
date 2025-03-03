const Doctor = require("../models/doctorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a doctor
const registerDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization, experience, phone, feesPerConsultation } = req.body;

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new doctor
    const newDoctor = new Doctor({ name, email, password: hashedPassword, specialization, experience, phone, feesPerConsultation });
    await newDoctor.save();

    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password"); 
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getDoctorsBySearch = async (req, res) => {
    try {
      const { specialization, name, location } = req.query;
  
      const query = {};
  
      if (specialization) {
        query.specialization = { $regex: specialization, $options: "i" }; 
      }
      if (name) {
        query.name = { $regex: name, $options: "i" }; 
      }
      if (location) {
        query.location = { $regex: location, $options: "i" }; 
      }
  
      // Query doctors based on filters
      const doctors = await Doctor.find(query).select("-password"); 
  
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
module.exports = { registerDoctor, getAllDoctors, getDoctorsBySearch };
