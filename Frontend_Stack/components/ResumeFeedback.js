import { useState } from "react";
import axios from "axios";

export default function ResumeFeedback() {
  const [resumeText, setResumeText] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized: Please log in again.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/resume-feedback",
        { resume: resumeText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFeedback(res.data.suggestion); // ✅ Display feedback response
    } catch (err) {
      console.error(
        "Error fetching resume feedback:",
        err.response?.data || err
      );
      alert("Failed to get resume feedback.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">Resume Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="border p-2 w-full"
          rows="4"
          placeholder="Paste your resume text here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Get Feedback
        </button>
      </form>
      {feedback && <p className="mt-2 text-green-600">{feedback}</p>}
    </div>
  );
}
