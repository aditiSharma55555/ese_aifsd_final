const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const protect = require("../middleware/authMiddleware");
const { analyzeComplaint } = require("../controllers/aiController");

const router = express.Router();

router.post("/analyze", protect, asyncHandler(analyzeComplaint));

module.exports = router;

