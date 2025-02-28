import { useState } from "react";
import axios from "axios";

export default function JobApplicationForm({ onApplicationAdded }) {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("Applied");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized: Please log in again.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/applications",
        { jobTitle, companyName, applicationStatus, notes },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setJobTitle("");
      setCompanyName("");
      setApplicationStatus("Applied");
      setNotes("");
      onApplicationAdded(); // ✅ Update dashboard state
    } catch (err) {
      console.error("Failed to add application:", err.response?.data || err);
      alert("Failed to add application.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">Add Job Application</h2>
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
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Application
      </button>
    </form>
  );
}
