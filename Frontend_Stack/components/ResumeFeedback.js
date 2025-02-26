import { useState } from "react";
import axios from "axios";

export default function ResumeFeedback() {
  const [resumeText, setResumeText] = useState("");
  const [feedback, setFeedback] = useState("");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleFeedback = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/resume_feedback",
        { resumeText },
        {
          headers: { "x-auth-token": token },
        }
      );
      setFeedback(res.data.suggestion);
    } catch (err) {
      console.error(err.response.data);
      alert("Failed to get feedback");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">Resume Feedback</h2>
      <form onSubmit={handleFeedback}>
        <textarea
          className="border p-1 w-full mb-2"
          placeholder="Paste your resume here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Get Feedback
        </button>
      </form>
      {feedback && <p className="mt-2 font-bold">Feedback: {feedback}</p>}
    </div>
  );
}
