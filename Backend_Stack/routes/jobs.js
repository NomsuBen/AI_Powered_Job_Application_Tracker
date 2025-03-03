const express = require("express");
const router = express.Router();

// ✅ Job Recommendations API (10 Test Jobs)
router.get("/recommendations", async (req, res) => {
  try {
    const jobs = [
      {
        id: 1,
        title: "Software Engineer",
        company: "Google",
        description: "Work on large-scale systems and AI projects.",
      },
      {
        id: 2,
        title: "Frontend Developer",
        company: "Facebook",
        description: "Build responsive UI with React and Next.js.",
      },
      {
        id: 3,
        title: "Backend Developer",
        company: "Amazon",
        description: "Work with AWS, Node.js, and scalable microservices.",
      },
      {
        id: 4,
        title: "Data Analyst",
        company: "Netflix",
        description: "Analyze streaming data and provide insights.",
      },
      {
        id: 5,
        title: "Machine Learning Engineer",
        company: "OpenAI",
        description: "Develop AI-driven applications and GPT models.",
      },
      {
        id: 6,
        title: "Cybersecurity Analyst",
        company: "Microsoft",
        description: "Secure cloud-based infrastructure and networks.",
      },
      {
        id: 7,
        title: "Cloud Engineer",
        company: "IBM",
        description: "Deploy and manage cloud solutions on IBM Cloud.",
      },
      {
        id: 8,
        title: "DevOps Engineer",
        company: "Twitter",
        description: "Automate CI/CD pipelines and manage cloud services.",
      },
      {
        id: 9,
        title: "Product Manager",
        company: "Apple",
        description: "Lead innovative projects and collaborate across teams.",
      },
      {
        id: 10,
        title: "UX Designer",
        company: "Adobe",
        description: "Create user-friendly designs for creative software.",
      },
    ];

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
