const express = require("express");
const { registerDoctor, getAllDoctors, getDoctorsBySearch,getDoctorById,updateDoctorProfile } = require("../controllers/doctorController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerDoctor);
router.get("/all", getAllDoctors);
router.get("/search", getDoctorsBySearch);
router.get("/:id", protect, getDoctorById);
router.put("/:id", protect, updateDoctorProfile);

module.exports = router;
