const express = require("express");
const { registerDoctor, getAllDoctors } = require("../controllers/doctorController");
const router = express.Router();

router.post("/register", registerDoctor);
router.get("/all", getAllDoctors);

module.exports = router;
