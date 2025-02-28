const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/applications");
const resumeFeedbackRoutes = require("./routes/resumeFeedback");
const { authenticate } = require("./middleware/auth");

// ✅ Load env variables only in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ API Running Check
app.get("/", (req, res) =>
  res.json({ status: "success", message: "API Running 🚀" })
);

// ✅ Register API Routes
app.use("/api/auth", authRoutes);
app.use("/api/applications", authenticate, applicationRoutes);
app.use("/api/resume-feedback", authenticate, resumeFeedbackRoutes);

// ✅ Catch 404 (Route Not Found)
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

// ✅ Global Error Handler (Improved for Debugging)
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
