const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth"); // Ensure correct middleware import

// POST /api/resumeFeedback
// Returns mock AI resume feedback for the user's resume
router.post("/", authenticate, async (req, res) => {
  try {
    const suggestions = [
      "Consider tailoring your resume to the job description.",
      "Highlight your most relevant experience.",
      "Use bullet points to make your resume easier to read.",
      "Ensure consistent formatting throughout your resume.",
      "Proofread your resume for spelling and grammar errors.",
    ];

    // Select a random suggestion
    const randomSuggestion =
      suggestions[Math.floor(Math.random() * suggestions.length)];

    res.json({ suggestion: randomSuggestion }); // ✅ Corrected: Directly return the selected suggestion
  } catch (error) {
    console.error("Error generating resume feedback:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
