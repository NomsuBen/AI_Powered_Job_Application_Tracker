const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Define Routes
app.use("/api", require("./routes/auth"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/resume_feedback", require("./routes/resumeFeedback"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
