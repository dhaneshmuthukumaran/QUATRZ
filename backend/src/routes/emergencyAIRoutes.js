const express = require("express");

const {
  updateAIResults
} = require("../controllers/emergencyAIController");

const router = express.Router();

router.patch("/:reportId/ai", updateAIResults);

module.exports = router;