require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/applications");
const resumeFeedbackRoutes = require("./routes/resumeFeedback");
const { authenticate } = require("./middleware/auth");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("API Running"));

// ✅ Register authentication routes
app.use("/api/auth", authRoutes);

// ✅ Protect routes with authentication middleware
app.use("/api/applications", authenticate, applicationRoutes);
app.use("/api/resume-feedback", authenticate, resumeFeedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
