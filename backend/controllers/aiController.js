const axios = require("axios");
const Complaint = require("../models/Complaint");

const DEFAULT_MODEL = "openai/gpt-4o-mini";

const buildPrompt = (complaint) => `
Analyze this complaint and provide:
1. urgency level
2. responsible department
3. automatic response message to user
4. short summary

Complaint details:
Name: ${complaint.name}
Email: ${complaint.email}
Title: ${complaint.title}
Description: ${complaint.description}
Category: ${complaint.category}
Location: ${complaint.location}
Status: ${complaint.status}

Return the response with clear headings.
`;

const analyzeComplaint = async (req, res) => {
  try {
    let complaint;

    if (req.body.complaintId) {
      complaint = await Complaint.findById(req.body.complaintId);
    } else {
      complaint = req.body;
    }

    if (!complaint || !complaint.title || !complaint.description) {
      return res.status(400).json({ message: "Complaint data is required for AI analysis" });
    }

    const response = await axios.post(
      process.env.AI_API_URL,
      {
        model: process.env.AI_MODEL || DEFAULT_MODEL,
        messages: [
          {
            role: "system",
            content: "You are a civic complaint assistant."
          },
          {
            role: "user",
            content: buildPrompt(complaint)
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "AI Smart Complaint Management"
        }
      }
    );

    const analysis =
      response.data?.choices?.[0]?.message?.content ||
      "No AI analysis returned.";

    res.json({
      analysis
    });
  } catch (error) {
    res.status(500).json({
      message: "AI complaint analysis failed",
      error: error.response?.data?.error?.message || error.response?.data || error.message
    });
  }
};

module.exports = {
  analyzeComplaint
};
