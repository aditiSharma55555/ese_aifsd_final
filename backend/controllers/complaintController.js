const Complaint = require("../models/Complaint");

const addComplaint = async (req, res) => {
  const { name, email, title, description, category, location, status } = req.body;

  if (!name || !email || !title || !description || !category || !location) {
    return res.status(400).json({ message: "Please fill all required complaint fields" });
  }

  const complaint = await Complaint.create({
    name,
    email,
    title,
    description,
    category,
    location,
    status: status || "Pending"
  });

  res.status(201).json({
    message: "Complaint stored successfully",
    complaint
  });
};

const getComplaints = async (req, res) => {
  const complaints = await Complaint.find().sort({ createdAt: -1 });
  res.json(complaints);
};

const searchComplaints = async (req, res) => {
  const { location = "", category = "" } = req.query;
  const query = {};

  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  if (category) {
    query.category = { $regex: category, $options: "i" };
  }

  const complaints = await Complaint.find(query).sort({ createdAt: -1 });
  res.json(complaints);
};

const updateComplaintStatus = async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  complaint.status = req.body.status || complaint.status;
  const updatedComplaint = await complaint.save();

  res.json({
    message: "Complaint status updated successfully",
    complaint: updatedComplaint
  });
};

const deleteComplaint = async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  await complaint.deleteOne();
  res.json({ message: "Complaint removed" });
};

module.exports = {
  addComplaint,
  getComplaints,
  searchComplaints,
  updateComplaintStatus,
  deleteComplaint
};

