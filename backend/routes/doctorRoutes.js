const express = require("express");
const { registerDoctor, getAllDoctors, getDoctorsBySearch } = require("../controllers/doctorController");
const router = express.Router();

router.post("/register", registerDoctor);
router.get("/all", getAllDoctors);
router.get("/search", getDoctorsBySearch);

module.exports = router;
