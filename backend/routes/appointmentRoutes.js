const express = require("express");
const { bookAppointment } = require("../controllers/appointmentController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/book", authMiddleware, bookAppointment);

module.exports = router;
