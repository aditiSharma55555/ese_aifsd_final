require("dns").setServers(["8.8.8.8", "8.8.4.4"]);
console.log("Starting server...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/complaints", require("./routes/complaintRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use(require("./middleware/errorMiddleware"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err.message));

app.get("/", (req, res) => {
  res.send("Smart Complaint API Running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});

