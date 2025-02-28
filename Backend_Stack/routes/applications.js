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
    ); // ✅ Debugging

    const { status, search } = req.query;
    let query = { userId: req.user.id }; // ✅ Get only the logged-in user's applications

    // ✅ Filter by status if provided
    if (status) query.applicationStatus = status;

    // ✅ Search by job title or company name
    if (search) {
      query.$or = [
        { jobTitle: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
      ];
    }

    const applications = await JobApplication.find(query);
    console.log("✅ Fetched Applications:", applications); // ✅ Debugging

    res.json(applications);
  } catch (error) {
    console.error("❌ Error in GET /api/applications:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
