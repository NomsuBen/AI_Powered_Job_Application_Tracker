const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/applications");
const resumeFeedbackRoutes = require("./routes/resumeFeedback");
const jobsRoutes = require("./routes/jobs"); // ✅ Added Jobs API Route
const { authenticate } = require("./middleware/auth");

// ✅ Load environment variables
require("dotenv").config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ FIX: Allow frontend domain(s) in CORS
app.use(
  cors({
    origin: [
      "https://nomsuben-job-tracker.vercel.app", // ✅ Frontend domain
      "http://localhost:3000", // ✅ Local frontend (for development)
    ],
    credentials: true, // ✅ Allow credentials (cookies, auth headers)
  })
);

// ✅ API Health Check
app.get("/", (req, res) => {
  res.json({ status: "success", message: "API Running 🚀" });
});

// ✅ Register Routes (Ensure proper order)
app.use("/api/auth", authRoutes); // Authentication (No authentication required)
app.use("/api/jobs", jobsRoutes); // ✅ Added Jobs Route

// ✅ Application & Resume Routes (Ensure auth where needed)
app.use("/api/applications", authenticate, applicationRoutes);
app.use("/api/resume-feedback", authenticate, resumeFeedbackRoutes);

// ✅ Catch All 404 Errors
app.use((req, res) => {
  console.warn(`⚠️ Route not found: ${req.originalUrl}`);
  res.status(404).json({ status: "error", message: "Route not found" });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    error:
      process.env.NODE_ENV === "development"
        ? err.stack
        : "Something went wrong",
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
