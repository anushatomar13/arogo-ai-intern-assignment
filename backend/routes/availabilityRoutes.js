const express = require("express");
const { setAvailability, getAvailability } = require("../controllers/availabilityController");
const router = express.Router();

router.post("/set", setAvailability);

router.get("/:doctorId", getAvailability);

module.exports = router;
