import { useState } from "react";
import axios from "axios";

export default function JobApplicationForm({ fetchApplications }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/applications",
        {
          title,
          company,
          status,
          notes,
        },
        {
          headers: { "x-auth-token": token },
        }
      );
      setTitle("");
      setCompany("");
      setStatus("Applied");
      setNotes("");
      fetchApplications();
    } catch (err) {
      console.error(err.response.data);
      alert("Failed to add application");
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block">Company</label>
        <input
          type="text"
          className="border p-1 w-full"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block">Status</label>
        <select
          className="border p-1 w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
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