const express = require("express");
const { 
    bookAppointment, 
    cancelAppointment, 
    getUserAppointments, 
    getDoctorAppointments,
    rescheduleAppointments,
    getAppointmentDetails 
} = require("../controllers/appointmentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/book", authMiddleware, bookAppointment);
router.post("/cancel", authMiddleware, cancelAppointment); 
router.get("/user", authMiddleware, getUserAppointments);
router.get("/doctor", authMiddleware, getDoctorAppointments);
router.put("/reschedule", authMiddleware, rescheduleAppointments);
router.get("/:id", getAppointmentDetails);

module.exports = router;
