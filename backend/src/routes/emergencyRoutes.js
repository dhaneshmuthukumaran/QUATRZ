const express = require("express");

const {
  createEmergencyReport
} = require("../controllers/emergencyController");

const router = express.Router();

router.post("/", createEmergencyReport);

module.exports = router;