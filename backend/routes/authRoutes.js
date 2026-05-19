const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { signupUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", asyncHandler(signupUser));
router.post("/login", asyncHandler(loginUser));

module.exports = router;

