const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const JobApplication = require("../models/JobApplication");

// ✅ GET All Job Applications
router.get("/", authenticate, async (req, res) => {
  try {
    console.log(
      "📥 Received GET /api/applications request from user:",
      req.user.id
    );

    const { status, search } = req.query;
    let query = { userId: req.user.id };

    if (status) query.applicationStatus = status;
    if (search) {
      query.$or = [
        { jobTitle: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
      ];
    }

    const applications = await JobApplication.find(query);
    console.log("✅ Fetched Applications:", applications);

    res.json(applications);
  } catch (error) {
    console.error("❌ Error in GET /api/applications:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
