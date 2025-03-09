import { useState, useEffect } from "react";
import axios from "axios";

export default function JobApplicationForm({ onApplicationAdded }) {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("Applied");
  const [notes, setNotes] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://ben-job-tracker-ac5542a936fb.herokuapp.com/api";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${API_URL}/auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUserId(res.data.user._id);
        })
        .catch((err) => {
          console.error("❌ Failed to fetch user:", err.response?.data || err);
          alert("Error fetching user data. Please log in again.");
        })
        .finally(() => setLoading(false)); // ✅ Ensure loading state updates
    } else {
      setLoading(false);
    }
  }, [API_URL]); // ✅ Added `API_URL` dependency to avoid stale values

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized: Please log in again.");
      return;
    }

    if (!userId) {
      alert("Error: User ID is missing. Please refresh or log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/applications`,
        {
          jobTitle: jobTitle.trim(),
          companyName: companyName.trim(),
          applicationStatus,
          notes: notes.trim(),
          dateApplied,
          userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("✅ Application Added:", response.data);

      // ✅ Reset form fields
      setJobTitle("");
      setCompanyName("");
      setApplicationStatus("Applied");
      setNotes("");
      setDateApplied("");

      // ✅ Notify parent component
      onApplicationAdded();
    } catch (err) {
      console.error("❌ Failed to add application:", err.response?.data || err);
      alert(
        `Error: ${err.response?.data?.message || "Failed to add application."}`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">Add Job Application</h2>

      {loading ? (
        <p>Loading user data...</p>
      ) : (
        <>
          <div className="mb-2">
            <label className="block">Job Title</label>
            <input
              type="text"
              className="border p-1 w-full"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block">Company</label>
            <input
              type="text"
              className="border p-1 w-full"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block">Status</label>
            <select
              className="border p-1 w-full"
              value={applicationStatus}
              onChange={(e) => setApplicationStatus(e.target.value)}
            >
              <option value="Applied">Applied</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Offer Received">Offer Received</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block">Notes</label>
            <textarea
              className="border p-1 w-full"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-2">
            <label className="block">Date Applied</label>
            <input
              type="date"
              className="border p-1 w-full"
              value={dateApplied}
              onChange={(e) => setDateApplied(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Application
          </button>
        </>
      )}
    </form>
  );
}
