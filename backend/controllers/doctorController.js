const Doctor = require("../models/doctorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a doctor
const registerDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization, experience, phone, feesPerConsultation, location } = req.body;

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new doctor
    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      specialization,
      experience,
      phone,
      feesPerConsultation,
      location
    });
    await newDoctor.save();

    // Generate JWT with doctor role
    const token = jwt.sign(
      { id: newDoctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ message: "Doctor registered successfully", token });
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

//Get doctor by location or specialization
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

//Get doctor by their ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select("-password");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.params.id;

    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    let doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (req.user.id.toString() !== doctorId.toString()) {
      return res.status(403).json({ message: "Not authorized to update this profile" });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { $set: req.body }, 
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({ message: "Profile updated successfully", doctor: updatedDoctor });
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerDoctor, getAllDoctors, getDoctorsBySearch,getDoctorById,updateDoctorProfile };
