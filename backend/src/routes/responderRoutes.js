const express = require("express");

const router = express.Router();

const {
  createResponder
} = require("../controllers/responderController");

router.post("/", createResponder);

module.exports = router;