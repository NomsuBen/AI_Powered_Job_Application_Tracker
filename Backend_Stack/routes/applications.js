const express = require("express");
const { authenticate } = require("../middleware/auth");
const JobApplication = require("../models/JobApplication");

const router = express.Router();

// ✅ Ensure userId is added before saving the application
router.post("/", authenticate, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ status: "error", message: "Unauthorized: Missing user ID" });
    }

    const newApplication = new JobApplication({
      userId: req.user.id, // ✅ Automatically attach userId from authenticated user
      jobTitle: req.body.jobTitle,
      companyName: req.body.companyName,
      applicationStatus: req.body.applicationStatus || "Applied",
      notes: req.body.notes,
      dateApplied: req.body.dateApplied,
    });

    await newApplication.save();
    res
      .status(201)
      .json({
        status: "success",
        message: "Application added",
        application: newApplication,
      });
  } catch (err) {
    console.error("❌ Error in POST /api/applications:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

module.exports = router;
