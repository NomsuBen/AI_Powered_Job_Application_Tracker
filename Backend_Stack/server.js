require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/applications");
const resumeFeedbackRoutes = require("./routes/resumeFeedback");
const { authenticate } = require("./middleware/auth");

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Change if using deployed frontend
    credentials: true,
  })
);

// ✅ API Running Check
app.get("/", (req, res) => res.send("API Running"));

// ✅ Register authentication routes
app.use("/api/auth", authRoutes);

// ✅ Protect application & resume routes
app.use("/api/applications", authenticate, applicationRoutes);
app.use("/api/resume-feedback", authenticate, resumeFeedbackRoutes);

// ✅ Handle Undefined Routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
