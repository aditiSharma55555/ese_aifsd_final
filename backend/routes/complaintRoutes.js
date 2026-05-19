const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const protect = require("../middleware/authMiddleware");
const {
  addComplaint,
  getComplaints,
  searchComplaints,
  updateComplaintStatus,
  deleteComplaint
} = require("../controllers/complaintController");

const router = express.Router();

router.get("/", protect, asyncHandler(getComplaints));
router.post("/", protect, asyncHandler(addComplaint));
router.get("/search", protect, asyncHandler(searchComplaints));
router.put("/:id", protect, asyncHandler(updateComplaintStatus));
router.delete("/:id", protect, asyncHandler(deleteComplaint));

module.exports = router;

