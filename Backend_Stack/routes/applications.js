const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const JobApplication = require("../models/JobApplication");

// ✅ CREATE a new job application (with logging & validation)
router.post("/", authenticate, async (req, res) => {
  try {
    const {
      companyName,
      jobTitle,
      jobLocation,
      applicationDate,
      applicationStatus,
      notes,
    } = req.body;

    console.log("Received Job Application Data:", req.body); // ✅ Log request data

    // ✅ Validate required fields
    if (!companyName || !jobTitle || !applicationStatus) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ Ensure `req.user.id` exists
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const newApplication = new JobApplication({
      userId: req.user.id,
      companyName,
      jobTitle,
      jobLocation,
      applicationDate: applicationDate || new Date(), // Default to current date if missing
      applicationStatus,
      notes,
    });

    const application = await newApplication.save();
    console.log("New Job Application Saved:", application); // ✅ Log saved data

    res.json(application);
  } catch (error) {
    console.error("Error in POST /api/applications:", error.message); // ✅ Log the actual error
    res.status(500).json({ error: "Server Error", details: error.message });
  }
});

module.exports = router;
