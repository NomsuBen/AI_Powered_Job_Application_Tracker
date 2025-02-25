const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// route post /api/resumeFeedback
// desc Return mock AI resume feedback for the user's resume
router.post('/', auth, async (req, res) => {
    const suggestions = [
        'Consider tailoring your resume to the job description.','Highlight your most relevant experience.','Use bullet points to make your resume easier to read.','Ensure consistent formatting throughout your resume.','Proofread your resume for spelling and grammar errors.'
    ];
    // Return a random suggestion
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    res.json({ suggestion: suggestions[randomSuggestion] });
}
);

module.exports = router;