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

    console.log("📥 Received Job Application Data:", req.body); // ✅ Debugging

    // ✅ Validate required fields
    if (!companyName || !jobTitle || !applicationStatus) {
      console.error("❌ Missing required fields.");
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ Ensure `req.user.id` exists
    if (!req.user || !req.user.id) {
      console.error("❌ User not authenticated.");
      return res.status(401).json({ error: "User not authenticated" });
    }

    // ✅ Log user ID
    console.log("🔑 User ID:", req.user.id);

    // ✅ Create job application
    const newApplication = new JobApplication({
      userId: req.user.id,
      companyName,
      jobTitle,
      jobLocation,
      applicationDate: applicationDate || new Date(), // Default to current date if missing
      applicationStatus,
      notes,
    });

    // ✅ Save to database
    const application = await newApplication.save();
    console.log("✅ New Job Application Saved:", application); // ✅ Debugging

    res.json(application);
  } catch (error) {
    console.error("❌ Error in POST /api/applications:", error.message); // ✅ Log the actual error
    res.status(500).json({ error: "Server Error", details: error.message });
  }
});

module.exports = router;
