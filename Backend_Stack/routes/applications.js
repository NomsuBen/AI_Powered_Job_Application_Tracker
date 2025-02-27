const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth"); // Ensure correct import
const JobApplication = require("../models/JobApplication");

// GET /api/applications
// Get all job applications for the logged-in user
router.get("/", authenticate, async (req, res) => {
  try {
    console.log("User from token:", req.user); // Debug log

    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "Unauthorized: No user ID" });
    }

    const applications = await JobApplication.find({ userId: req.user.id });
    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error.message);
    res.status(500).send("Server Error");
  }
});

// POST /api/applications
// Create a new job application
router.post("/", authenticate, async (req, res) => {
  const {
    companyName,
    jobTitle,
    jobLocation,
    applicationDate,
    applicationStatus,
    notes,
  } = req.body;

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "Unauthorized: No user ID" });
    }

    const newApplication = new JobApplication({
      userId: req.user.id,
      companyName,
      jobTitle,
      jobLocation,
      applicationDate,
      applicationStatus,
      notes,
    });

    const application = await newApplication.save();
    res.json(application);
  } catch (error) {
    console.error("Error creating application:", error.message);
    res.status(500).send("Server Error");
  }
});

// PUT /api/applications/:id
// Update an existing job application
router.put("/:id", authenticate, async (req, res) => {
  const {
    companyName,
    jobTitle,
    jobLocation,
    applicationDate,
    applicationStatus,
    notes,
  } = req.body;

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "Unauthorized: No user ID" });
    }

    let application = await JobApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ msg: "Application not found" });
    }

    if (application.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Update fields if provided
    application.companyName = companyName || application.companyName;
    application.jobTitle = jobTitle || application.jobTitle;
    application.jobLocation = jobLocation || application.jobLocation;
    application.applicationDate =
      applicationDate || application.applicationDate;
    application.applicationStatus =
      applicationStatus || application.applicationStatus;
    application.notes = notes || application.notes;

    application = await application.save();
    res.json(application);
  } catch (error) {
    console.error("Error updating application:", error.message);
    res.status(500).send("Server Error");
  }
});

// DELETE /api/applications/:id
// Delete an existing job application
router.delete("/:id", authenticate, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "Unauthorized: No user ID" });
    }

    let application = await JobApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ msg: "Application not found" });
    }

    if (application.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await JobApplication.findByIdAndRemove(req.params.id);
    res.json({ msg: "Application removed" });
  } catch (error) {
    console.error("Error deleting application:", error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
