const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/applications");
const resumeFeedbackRoutes = require("./routes/resumeFeedback");
const jobsRoutes = require("./routes/jobs");
const { authenticate } = require("./middleware/auth");
require("dotenv").config();

const app = express();

// ✅ Connect to MongoDB before starting the server
connectDB()
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    // ✅ Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

    // ✅ Dynamic CORS setup (Allows frontend flexibility)
    const FRONTEND_URL =
      process.env.FRONTEND_URL || "https://nomsuben-job-tracker.vercel.app";
    app.use(cors({ origin: FRONTEND_URL, credentials: true }));

    // ✅ API Health Check
    app.get("/", (req, res) => {
      res.status(200).json({ status: "success", message: "API Running 🚀" });
    });

    // ✅ Register Routes (Ensure proper order)
    console.log("✅ Registering Routes...");
    app.use("/api/auth", authRoutes);
    app.use("/api/jobs", jobsRoutes);
    app.use("/api/resume-feedback", authenticate, resumeFeedbackRoutes);
    app.use("/api/applications", authenticate, applicationRoutes);
    console.log("✅ All Routes Registered Successfully!");

    // ✅ Catch All 404 Errors
    app.use((req, res) => {
      console.warn(`⚠️ Route not found: ${req.method} ${req.originalUrl}`);
      res.status(404).json({ status: "error", message: "Route not found" });
    });

    // ✅ Global Error Handler
    app.use((err, req, res, next) => {
      console.error("❌ Server Error:", err.stack);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        error:
          process.env.NODE_ENV === "development"
            ? err.message
            : "Something went wrong",
      });
    });

    // ✅ Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // ✅ Stop the server if DB connection fails
  });
