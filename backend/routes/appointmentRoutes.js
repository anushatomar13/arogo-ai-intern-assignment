const express = require("express");
const { bookAppointment,cancelAppointment } = require("../controllers/appointmentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/book", authMiddleware, bookAppointment);
router.post("/cancel", authMiddleware, cancelAppointment); 

module.exports = router;
