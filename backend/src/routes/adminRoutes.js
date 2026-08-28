const express = require("express");

const {
  assignEmergency
} = require("../controllers/adminController");

const router = express.Router();

router.patch(
  "/emergencies/:reportId",
  assignEmergency
);

module.exports = router;