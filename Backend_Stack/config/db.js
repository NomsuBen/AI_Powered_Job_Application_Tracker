require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/applications");
const resumeFeedbackRoutes = require("./routes/resumeFeedback");
const { authenticate } = require("../middleware/auth");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => res.send("API Running"));
app.use("/api/auth", authRoutes);
app.use("/api/applications", authenticate, applicationRoutes);
app.use("/api/resume-feedback", authenticate, resumeFeedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
